package com.bookstore.repository;
import com.bookstore.domain.Gift;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Gift entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GiftRepository extends JpaRepository<Gift, Long> {

}
