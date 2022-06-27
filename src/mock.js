import React from "react";

/**
 * Attributes:
 * name,
 * price, 
 */
class ProductRow extends React.Component {
  // FIXME: this needs to be cleaned
  constructor(props) {
    super(props);
    this.product = props.product;
    this.name = this.product.stocked ?
      this.product.name :
      <span style={{ color: 'red' }}>{this.product.name}</span>;
    this.price = props.product.price;
  }

  componentWillUnmount() {
    console.log("ProductRow " + this.name + " has unmounted");
  }

  render() {
    this.product = this.props.product;
    this.name = this.product.stocked ?
      this.product.name :
      <span style={{ color: 'red' }}>{this.product.name}</span>;
    this.price = this.props.product.price;
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
    this.category = props.category;
  }

  getProductRows() {
    // FIXME: iPhone 5 is being rendered when it should not
    // Nexus7 is not being rendered when it should
    let productRows = [];
    let stockedOnly = this.props.stockedOnly;
    this.products = this.props.products;
    this.category = this.props.category;

    this.products.forEach( (product) => {
      if (product.category === this.category) {
        if (!product.stocked && stockedOnly) {
          console.log("Product " + product.name + " not stocked");
        } else {
          productRows.push(<ProductRow product={product} />);
        }
      }
    });

    if (productRows.length > 0) {
      return productRows;
    }
    return "";
  }

  render() {
    let productRows = this.getProductRows();
    if (productRows !== "") {
      return (
        <div>
          <tr>
            <th>{this.category}</th>
          </tr>
          {productRows}
        </div>
      );
    }
    return "";
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
    const stockedOnly = this.props.stockedOnly;
    this.products = this.props.products;
    this.categories = this.getCategories();

    this.categories.forEach((category) => {
      productCategoryRows.push(<ProductCategoryRow
        products={this.products}
        category={category}
        stockedOnly={stockedOnly} />)
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
    console.log("CHECKBOX STATUS: " + e.target.checked);
    this.props.onCheckboxChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" onChange={this.handleChange} />
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
    this.state = { stockedOnly: false };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(value) {
    console.log("Setting stockedOnly state to " + value);
    this.setState({ stockedOnly: value });
    
  }

  render() {
    const stockedOnly = this.state.stockedOnly;
    this.products = this.props.products;
    console.log("STATE IS NOW " + this.state.stockedOnly);
    return (
      <div>
        <SearchBar onCheckboxChange={this.handleCheckboxChange} />
        <ProductTable products={this.products} stockedOnly={stockedOnly} />
      </div>
    );
  }
}

