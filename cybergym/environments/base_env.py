"""Base environment class for CyberGym."""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Tuple

import gymnasium as gym
import numpy as np


class BaseEnvironment(gym.Env, ABC):
    """Abstract base class for multi-agent cyber security environments."""

    def __init__(
        self,
        n_agents: int = 2,
        observation_space_dim: int = 10,
        action_space_dim: int = 5,
        max_steps: int = 1000,
        seed: Optional[int] = None,
    ):
        super().__init__()
        self.n_agents = n_agents
        self.max_steps = max_steps
        self.current_step = 0
        
        self.observation_space = gym.spaces.Box(
            low=-np.inf,
            high=np.inf,
            shape=(observation_space_dim,),
            dtype=np.float32
        )
        
        self.action_space = gym.spaces.Discrete(action_space_dim)
        
        if seed is not None:
            self.seed(seed)
    
    @abstractmethod
    def reset(
        self, 
        seed: Optional[int] = None,
        options: Optional[Dict[str, Any]] = None
    ) -> Tuple[np.ndarray, Dict[str, Any]]:
        """Reset the environment to initial state."""
        pass
    
    @abstractmethod
    def step(
        self, 
        actions: Dict[str, Any]
    ) -> Tuple[Dict[str, np.ndarray], Dict[str, float], Dict[str, bool], Dict[str, bool], Dict[str, Dict]]:
        """Execute one time step within the environment."""
        pass
    
    @abstractmethod
    def render(self) -> Optional[np.ndarray]:
        """Render the environment."""
        pass
    
    def seed(self, seed: int) -> List[int]:
        """Set the seed for random number generation."""
        self.np_random = np.random.RandomState(seed)
        return [seed]