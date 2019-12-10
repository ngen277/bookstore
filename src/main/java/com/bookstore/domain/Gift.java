package com.bookstore.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Gift.
 */
@Entity
@Table(name = "gift")
public class Gift implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gift")
    private String gift;

    @ManyToMany(mappedBy = "gifts")
    @JsonIgnore
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGift() {
        return gift;
    }

    public Gift gift(String gift) {
        this.gift = gift;
        return this;
    }

    public void setGift(String gift) {
        this.gift = gift;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public Gift books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public Gift addBook(Book book) {
        this.books.add(book);
        book.getGifts().add(this);
        return this;
    }

    public Gift removeBook(Book book) {
        this.books.remove(book);
        book.getGifts().remove(this);
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
        if (!(o instanceof Gift)) {
            return false;
        }
        return id != null && id.equals(((Gift) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Gift{" +
            "id=" + getId() +
            ", gift='" + getGift() + "'" +
            "}";
    }
}
