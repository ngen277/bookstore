package com.bookstore.repository;
import com.bookstore.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Book entity.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "select distinct book from Book book left join fetch book.categories left join fetch book.languages left join fetch book.gifts",
        countQuery = "select count(distinct book) from Book book")
    Page<Book> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct book from Book book left join fetch book.categories left join fetch book.languages left join fetch book.gifts")
    List<Book> findAllWithEagerRelationships();

    @Query("select book from Book book left join fetch book.categories left join fetch book.languages left join fetch book.gifts where book.id =:id")
    Optional<Book> findOneWithEagerRelationships(@Param("id") Long id);

}
