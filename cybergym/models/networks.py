"""Neural network architectures for CyberGym."""

from typing import List, Optional

import torch
import torch.nn as nn
import torch.nn.functional as F


class MLP(nn.Module):
    """Multi-Layer Perceptron network."""
    
    def __init__(
        self,
        input_dim: int,
        hidden_dims: List[int],
        output_dim: int,
        activation: nn.Module = nn.ReLU(),
        dropout: float = 0.0,
    ):
        super().__init__()
        
        dims = [input_dim] + hidden_dims + [output_dim]
        layers = []
        
        for i in range(len(dims) - 1):
            layers.append(nn.Linear(dims[i], dims[i + 1]))
            
            if i < len(dims) - 2:
                layers.append(activation)
                if dropout > 0:
                    layers.append(nn.Dropout(dropout))
        
        self.network = nn.Sequential(*layers)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)


class AttentionNetwork(nn.Module):
    """Self-attention network for processing multi-agent observations."""
    
    def __init__(
        self,
        input_dim: int,
        hidden_dim: int,
        n_heads: int = 4,
        dropout: float = 0.1,
    ):
        super().__init__()
        
        self.attention = nn.MultiheadAttention(
            embed_dim=input_dim,
            num_heads=n_heads,
            dropout=dropout,
            batch_first=True,
        )
        
        self.norm1 = nn.LayerNorm(input_dim)
        self.norm2 = nn.LayerNorm(input_dim)
        
        self.ffn = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, input_dim),
        )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        attn_out, _ = self.attention(x, x, x)
        x = self.norm1(x + attn_out)
        
        ffn_out = self.ffn(x)
        x = self.norm2(x + ffn_out)
        
        return x


class PolicyNetwork(nn.Module):
    """Policy network for action selection."""
    
    def __init__(
        self,
        observation_dim: int,
        action_dim: int,
        hidden_dims: List[int] = [256, 128],
        use_attention: bool = False,
    ):
        super().__init__()
        
        self.use_attention = use_attention
        
        if use_attention:
            self.attention = AttentionNetwork(observation_dim, hidden_dims[0])
        
        self.mlp = MLP(
            input_dim=observation_dim,
            hidden_dims=hidden_dims,
            output_dim=action_dim,
        )
    
    def forward(self, obs: torch.Tensor) -> torch.Tensor:
        if self.use_attention and len(obs.shape) > 2:
            obs = self.attention(obs)
            obs = obs.mean(dim=1)
        
        logits = self.mlp(obs)
        return F.softmax(logits, dim=-1)


class ValueNetwork(nn.Module):
    """Value network for state value estimation."""
    
    def __init__(
        self,
        observation_dim: int,
        hidden_dims: List[int] = [256, 128],
        use_attention: bool = False,
    ):
        super().__init__()
        
        self.use_attention = use_attention
        
        if use_attention:
            self.attention = AttentionNetwork(observation_dim, hidden_dims[0])
        
        self.mlp = MLP(
            input_dim=observation_dim,
            hidden_dims=hidden_dims,
            output_dim=1,
        )
    
    def forward(self, obs: torch.Tensor) -> torch.Tensor:
        if self.use_attention and len(obs.shape) > 2:
            obs = self.attention(obs)
            obs = obs.mean(dim=1)
        
        return self.mlp(obs)