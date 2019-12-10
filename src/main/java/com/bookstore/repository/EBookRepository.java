package com.bookstore.repository;
import com.bookstore.domain.EBook;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EBookRepository extends JpaRepository<EBook, Long> {

}
