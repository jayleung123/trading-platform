package com.jay.treading.repository;

import com.jay.treading.modal.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository  extends JpaRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);
}
