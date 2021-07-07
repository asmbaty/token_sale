// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract ArdinisToken is IERC20 {

    uint256 private totalSupply_;

    mapping(address => uint256) private balanceOf_;

    constructor(uint256 _initialSupply)
    {
        totalSupply_ = _initialSupply;

        // allocate the initial supply
        balanceOf_[msg.sender] = totalSupply_;
    }

    error InsufficientBalance(address sender, uint256 amount, uint256 balance);

    function totalSupply() external view override returns (uint256)
    {
        return totalSupply_;
    }

    function balanceOf(address account) external view override returns (uint256)
    {
        return balanceOf_[account];
    }

    function transfer(address recipient, uint256 amount) external override returns (bool)
    {
        if(balanceOf_[msg.sender] < amount) {
            revert InsufficientBalance(msg.sender, amount, balanceOf_[msg.sender]);
        }
        balanceOf_[msg.sender] -= amount;
        balanceOf_[recipient] += amount;
        return true ;
    }

    function allowance(address owner, address spender) external view override returns (uint256)
    {
        return 0;
    }
    
    function approve(address spender, uint256 amount) external override returns (bool)
    {
        return false;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external override returns (bool)
    {
        return false;
    }

}