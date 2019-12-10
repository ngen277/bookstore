package com.bookstore.web.rest;

import com.bookstore.domain.Cover;
import com.bookstore.repository.CoverRepository;
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
 * REST controller for managing {@link com.bookstore.domain.Cover}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoverResource {

    private final Logger log = LoggerFactory.getLogger(CoverResource.class);

    private static final String ENTITY_NAME = "cover";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoverRepository coverRepository;

    public CoverResource(CoverRepository coverRepository) {
        this.coverRepository = coverRepository;
    }

    /**
     * {@code POST  /covers} : Create a new cover.
     *
     * @param cover the cover to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cover, or with status {@code 400 (Bad Request)} if the cover has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/covers")
    public ResponseEntity<Cover> createCover(@RequestBody Cover cover) throws URISyntaxException {
        log.debug("REST request to save Cover : {}", cover);
        if (cover.getId() != null) {
            throw new BadRequestAlertException("A new cover cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cover result = coverRepository.save(cover);
        return ResponseEntity.created(new URI("/api/covers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /covers} : Updates an existing cover.
     *
     * @param cover the cover to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cover,
     * or with status {@code 400 (Bad Request)} if the cover is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cover couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/covers")
    public ResponseEntity<Cover> updateCover(@RequestBody Cover cover) throws URISyntaxException {
        log.debug("REST request to update Cover : {}", cover);
        if (cover.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cover result = coverRepository.save(cover);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cover.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /covers} : get all the covers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of covers in body.
     */
    @GetMapping("/covers")
    public List<Cover> getAllCovers() {
        log.debug("REST request to get all Covers");
        return coverRepository.findAll();
    }

    /**
     * {@code GET  /covers/:id} : get the "id" cover.
     *
     * @param id the id of the cover to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cover, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/covers/{id}")
    public ResponseEntity<Cover> getCover(@PathVariable Long id) {
        log.debug("REST request to get Cover : {}", id);
        Optional<Cover> cover = coverRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cover);
    }

    /**
     * {@code DELETE  /covers/:id} : delete the "id" cover.
     *
     * @param id the id of the cover to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/covers/{id}")
    public ResponseEntity<Void> deleteCover(@PathVariable Long id) {
        log.debug("REST request to delete Cover : {}", id);
        coverRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
