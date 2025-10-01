#!/usr/bin/env python3
"""Training script for CyberGym agents."""

import logging
import os
from pathlib import Path

import hydra
import torch
import wandb
from omegaconf import DictConfig, OmegaConf

from cybergym.agents import PPOAgent
from cybergym.environments import CyberSecurityEnvironment
from cybergym.utils.training import Trainer

log = logging.getLogger(__name__)


@hydra.main(version_base=None, config_path="../configs", config_name="default")
def main(cfg: DictConfig) -> None:
    """Main training function."""
    
    log.info("Starting CyberGym training")
    log.info(f"Configuration:\n{OmegaConf.to_yaml(cfg)}")
    
    # Set random seeds
    torch.manual_seed(cfg.experiment.seed)
    
    # Initialize W&B if configured
    if cfg.experiment.wandb.project:
        wandb.init(
            project=cfg.experiment.wandb.project,
            entity=cfg.experiment.wandb.entity,
            config=OmegaConf.to_container(cfg, resolve=True),
            tags=cfg.experiment.wandb.tags,
        )
    
    # Create environment
    env = CyberSecurityEnvironment(
        n_agents=cfg.env.n_agents,
        observation_space_dim=cfg.env.observation_dim,
        action_space_dim=cfg.env.action_dim,
        max_steps=cfg.env.max_steps,
    )
    
    # Create agent
    agent = PPOAgent(
        observation_dim=cfg.env.observation_dim,
        action_dim=cfg.env.action_dim,
        learning_rate=cfg.agent.learning_rate,
        device=cfg.experiment.device,
    )
    
    # Create trainer
    trainer = Trainer(
        agent=agent,
        env=env,
        cfg=cfg,
    )
    
    # Train
    trainer.train()
    
    # Save final model
    checkpoint_path = Path(cfg.experiment.checkpoint_dir) / "final_model.pth"
    agent.save(str(checkpoint_path))
    log.info(f"Saved final model to {checkpoint_path}")
    
    # Close W&B
    if cfg.experiment.wandb.project:
        wandb.finish()


if __name__ == "__main__":
    main()