package com.bookstore.web.rest;

import com.bookstore.domain.EBook;
import com.bookstore.repository.EBookRepository;
import com.bookstore.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.bookstore.domain.EBook}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EBookResource {

    private final Logger log = LoggerFactory.getLogger(EBookResource.class);

    private static final String ENTITY_NAME = "eBook";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EBookRepository eBookRepository;

    public EBookResource(EBookRepository eBookRepository) {
        this.eBookRepository = eBookRepository;
    }

    /**
     * {@code POST  /e-books} : Create a new eBook.
     *
     * @param eBook the eBook to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new eBook, or with status {@code 400 (Bad Request)} if the eBook has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/e-books")
    public ResponseEntity<EBook> createEBook(@RequestBody EBook eBook) throws URISyntaxException {
        log.debug("REST request to save EBook : {}", eBook);
        if (eBook.getId() != null) {
            throw new BadRequestAlertException("A new eBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EBook result = eBookRepository.save(eBook);
        return ResponseEntity.created(new URI("/api/e-books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /e-books} : Updates an existing eBook.
     *
     * @param eBook the eBook to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated eBook,
     * or with status {@code 400 (Bad Request)} if the eBook is not valid,
     * or with status {@code 500 (Internal Server Error)} if the eBook couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/e-books")
    public ResponseEntity<EBook> updateEBook(@RequestBody EBook eBook) throws URISyntaxException {
        log.debug("REST request to update EBook : {}", eBook);
        if (eBook.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EBook result = eBookRepository.save(eBook);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, eBook.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /e-books} : get all the eBooks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of eBooks in body.
     */
    @GetMapping("/e-books")
    public List<EBook> getAllEBooks() {
        log.debug("REST request to get all EBooks");
        return eBookRepository.findAll();
    }

    /**
     * {@code GET  /e-books/:id} : get the "id" eBook.
     *
     * @param id the id of the eBook to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the eBook, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/e-books/{id}")
    public ResponseEntity<EBook> getEBook(@PathVariable Long id) {
        log.debug("REST request to get EBook : {}", id);
        Optional<EBook> eBook = eBookRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(eBook);
    }

    /**
     * {@code DELETE  /e-books/:id} : delete the "id" eBook.
     *
     * @param id the id of the eBook to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/e-books/{id}")
    public ResponseEntity<Void> deleteEBook(@PathVariable Long id) {
        log.debug("REST request to delete EBook : {}", id);
        eBookRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
