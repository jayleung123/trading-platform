package com.jay.treading.repository;

import com.jay.treading.modal.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository  extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);
}
