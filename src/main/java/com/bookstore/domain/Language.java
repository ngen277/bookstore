package com.bookstore.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Language.
 */
@Entity
@Table(name = "language")
public class Language implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "language")
    private String language;

    @ManyToMany(mappedBy = "languages")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public Language language(String language) {
        this.language = language;
        return this;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Language books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Language addBook(Book book) {
        this.books.add(book);
        book.getLanguages().add(this);
        return this;
    }

    public Language removeBook(Book book) {
        this.books.remove(book);
        book.getLanguages().remove(this);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Language)) {
            return false;
        }
        return id != null && id.equals(((Language) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Language{" +
            "id=" + getId() +
            ", language='" + getLanguage() + "'" +
            "}";
    }
}
