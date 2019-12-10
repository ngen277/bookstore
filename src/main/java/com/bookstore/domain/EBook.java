package com.bookstore.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EBook.
 */
@Entity
@Table(name = "e_book")
public class EBook implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "format")
    private String format;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFormat() {
        return format;
    }

    public EBook format(String format) {
        this.format = format;
        return this;
    }

    public void setFormat(String format) {
        this.format = format;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EBook)) {
            return false;
        }
        return id != null && id.equals(((EBook) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EBook{" +
            "id=" + getId() +
            ", format='" + getFormat() + "'" +
            "}";
    }
}
