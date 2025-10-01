"""Base agent class for CyberGym."""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

import numpy as np
import torch
import torch.nn as nn


class BaseAgent(ABC):
    """Abstract base class for reinforcement learning agents."""

    def __init__(
        self,
        observation_dim: int,
        action_dim: int,
        learning_rate: float = 3e-4,
        device: str = "cpu",
    ):
        self.observation_dim = observation_dim
        self.action_dim = action_dim
        self.learning_rate = learning_rate
        self.device = torch.device(device)
        
        self.policy_net = None
        self.value_net = None
        self.optimizer = None
        
        self._build_networks()
    
    @abstractmethod
    def _build_networks(self) -> None:
        """Build neural network architectures."""
        pass
    
    @abstractmethod
    def act(
        self, 
        observation: np.ndarray,
        deterministic: bool = False
    ) -> np.ndarray:
        """Select an action given an observation."""
        pass
    
    @abstractmethod
    def update(
        self, 
        batch: Dict[str, torch.Tensor]
    ) -> Dict[str, float]:
        """Update agent parameters using a batch of experiences."""
        pass
    
    def save(self, filepath: str) -> None:
        """Save agent parameters to file."""
        checkpoint = {
            "policy_net": self.policy_net.state_dict() if self.policy_net else None,
            "value_net": self.value_net.state_dict() if self.value_net else None,
            "optimizer": self.optimizer.state_dict() if self.optimizer else None,
        }
        torch.save(checkpoint, filepath)
    
    def load(self, filepath: str) -> None:
        """Load agent parameters from file."""
        checkpoint = torch.load(filepath, map_location=self.device)
        
        if self.policy_net and checkpoint.get("policy_net"):
            self.policy_net.load_state_dict(checkpoint["policy_net"])
        
        if self.value_net and checkpoint.get("value_net"):
            self.value_net.load_state_dict(checkpoint["value_net"])
        
        if self.optimizer and checkpoint.get("optimizer"):
            self.optimizer.load_state_dict(checkpoint["optimizer"])