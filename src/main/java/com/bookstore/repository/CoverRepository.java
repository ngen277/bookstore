package com.bookstore.repository;
import com.bookstore.domain.Cover;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cover entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoverRepository extends JpaRepository<Cover, Long> {

}
