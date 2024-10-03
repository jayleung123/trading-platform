package com.jay.treading.service;

import com.jay.treading.domain.OrderType;
import com.jay.treading.modal.Coin;
import com.jay.treading.modal.Order;
import com.jay.treading.modal.OrderItem;
import com.jay.treading.modal.User;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
