package com.bookstore.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @OneToOne
    @JoinColumn(unique = true)
    private Author author;

    @OneToOne
    @JoinColumn(unique = true)
    private Cover cover;

    @OneToOne
    @JoinColumn(unique = true)
    private Discount discount;

    @OneToOne
    @JoinColumn(unique = true)
    private EBook ebook;

    @OneToOne
    @JoinColumn(unique = true)
    private Publisher publisher;

    @OneToOne
    @JoinColumn(unique = true)
    private Rating rating;

    @OneToMany(mappedBy = "book")
    private Set<Sale> sales = new HashSet<>();

    @OneToMany(mappedBy = "book")
    private Set<News> news = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "book_categories",
               joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "categories_id", referencedColumnName = "id"))
    private Set<Category> categories = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "book_language",
               joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "language_id", referencedColumnName = "id"))
    private Set<Language> languages = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "book_gift",
               joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "gift_id", referencedColumnName = "id"))
    private Set<Gift> gifts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Book name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Book description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public Book price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Author getAuthor() {
        return author;
    }

    public Book author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Cover getCover() {
        return cover;
    }

    public Book cover(Cover cover) {
        this.cover = cover;
        return this;
    }

    public void setCover(Cover cover) {
        this.cover = cover;
    }

    public Discount getDiscount() {
        return discount;
    }

    public Book discount(Discount discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public EBook getEbook() {
        return ebook;
    }

    public Book ebook(EBook eBook) {
        this.ebook = eBook;
        return this;
    }

    public void setEbook(EBook eBook) {
        this.ebook = eBook;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public Book publisher(Publisher publisher) {
        this.publisher = publisher;
        return this;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public Rating getRating() {
        return rating;
    }

    public Book rating(Rating rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public Set<Sale> getSales() {
        return sales;
    }

    public Book sales(Set<Sale> sales) {
        this.sales = sales;
        return this;
    }

    public Book addSales(Sale sale) {
        this.sales.add(sale);
        sale.setBook(this);
        return this;
    }

    public Book removeSales(Sale sale) {
        this.sales.remove(sale);
        sale.setBook(null);
        return this;
    }

    public void setSales(Set<Sale> sales) {
        this.sales = sales;
    }

    public Set<News> getNews() {
        return news;
    }

    public Book news(Set<News> news) {
        this.news = news;
        return this;
    }

    public Book addNews(News news) {
        this.news.add(news);
        news.setBook(this);
        return this;
    }

    public Book removeNews(News news) {
        this.news.remove(news);
        news.setBook(null);
        return this;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Book categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Book addCategories(Category category) {
        this.categories.add(category);
        category.getBooks().add(this);
        return this;
    }

    public Book removeCategories(Category category) {
        this.categories.remove(category);
        category.getBooks().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Language> getLanguages() {
        return languages;
    }

    public Book languages(Set<Language> languages) {
        this.languages = languages;
        return this;
    }

    public Book addLanguage(Language language) {
        this.languages.add(language);
        language.getBooks().add(this);
        return this;
    }

    public Book removeLanguage(Language language) {
        this.languages.remove(language);
        language.getBooks().remove(this);
        return this;
    }

    public void setLanguages(Set<Language> languages) {
        this.languages = languages;
    }

    public Set<Gift> getGifts() {
        return gifts;
    }

    public Book gifts(Set<Gift> gifts) {
        this.gifts = gifts;
        return this;
    }

    public Book addGift(Gift gift) {
        this.gifts.add(gift);
        gift.getBooks().add(this);
        return this;
    }

    public Book removeGift(Gift gift) {
        this.gifts.remove(gift);
        gift.getBooks().remove(this);
        return this;
    }

    public void setGifts(Set<Gift> gifts) {
        this.gifts = gifts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
