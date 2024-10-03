package com.jay.treading.service;

import com.jay.treading.modal.Order;
import com.jay.treading.modal.User;
import com.jay.treading.modal.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long money);
    Wallet findWalletById(Long id) throws Exception;
    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;

}
