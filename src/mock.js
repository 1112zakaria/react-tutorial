import React from "react";

/**
 * Attributes:
 * name,
 * price, 
 */
class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.product = props.product;
    this.name = this.product.stocked ? 
      this.product.name : 
      <span style={{color: 'red'}}>{this.product.name}</span>;
    this.price = props.product.price;
  }

  render() {
    return (
      <tr>
        <td>{this.name}</td>
        <td>{this.price}</td>
      </tr>
    );
  }
}

class ProductCategoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    console.log(this.products);
    this.category = props.category;

  }

  getProductRows() {
    const productRows = [];
    this.products.forEach((product) => {
      if (product.category === this.category) {
        productRows.push(<ProductRow product={product} />);
      }
    });

    return productRows;
  }

  render() {
    const productRows = this.getProductRows();
    console.log(productRows);
    return (
      <div>
        <tr>
          <th>{this.category}</th>
        </tr>
        {productRows}
      </div>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    this.categories = this.getCategories();

  }

  getCategories() {
    const categories = new Set();
    this.products.forEach((product) => {
      categories.add(product.category);
    })
    return categories;
  }

  render() {

    // 1. get set of categories
    // 2. iterate over products, creating array
    //  of products in same category and pass as
    //  argument to <ProductCategoryRow>
    const productCategoryRows = [];
    this.categories.forEach((category) => {
      productCategoryRows.push(<ProductCategoryRow
        products={this.products}
        category={category} />)
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productCategoryRows}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.checked);
    this.props.onCheckboxChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" onChange={this.handleChange}/>
          Only show products in stock
        </p>
      </form>
    );
  }
}

/**
 * Expected schema:
 * 
 */
export class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.products = props.products;
    this.state = {onlyStocked: false};
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(value) {
    this.setState({onlyStocked: value});
  }

  render() {
    return (
      <div>
        <SearchBar onCheckboxChange={this.handleCheckboxChange}/>
        <ProductTable products={this.products} />
      </div>
    );
  }
}

