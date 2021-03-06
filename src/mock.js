import React from "react";

// TODO: refactor further by abstracting certain props,
// like stocked, to display?
// TODO: add filter text
// https://www.youtube.com/watch?v=N_s_ZTeiXxE

/**
 * Attributes:
 * name,
 * price, 
 */
class ProductRow extends React.Component {
  // FIXME: this needs to be cleaned
  // FIXME: out of stock items are not showing in search
  constructor(props) {
    super(props);
    this.product = props.product;
    
  }

  matchFilter() {
    const filterText = this.props.filterText.toLowerCase();
    if (filterText === "") {
      return true;
    }
    let re = new RegExp(filterText);
    let str = this.product.name.toString().toLowerCase();
    return re.test(str);
  }

  render() {
    this.product = this.props.product;
    this.name = this.product.stocked ?
      this.product.name :
      <span style={{ color: 'red' }}>{this.product.name}</span>;
    this.price = this.product.price;
    this.stocked = this.product.stocked;
    
    if ( (this.props.stockedOnly && !this.stocked) || !this.matchFilter()) {
      return "";
    }

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
    let isStocked = false;

    this.products.forEach((product) => {
      if (product.category === this.category) {
        productRows.push(<ProductRow 
          product={product} 
          stockedOnly={stockedOnly}
          filterText={this.props.filterText}/>);
        if (product.stocked) {
          isStocked = true;
        }
      }
    });

    if (!isStocked && stockedOnly) {
      return "";
    }
    return productRows;
  }

  render() {
    let productRows = this.getProductRows();
    if (productRows !== "") {
      return (
        <div>
          <tr>
            <th colspan="2">{this.category}</th>
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
    // FIXME: attributes can be refactored, or even turned to function?
    const productCategoryRows = [];
    const stockedOnly = this.props.stockedOnly;
    this.products = this.props.products;
    this.categories = this.getCategories();

    this.categories.forEach((category) => {
      productCategoryRows.push(<ProductCategoryRow
        products={this.products}
        category={category}
        stockedOnly={stockedOnly} 
        filterText={this.props.filterText}/>)
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log("CHECKBOX STATUS: " + e.target.checked);
    console.log("Target: " + e.target.name);
    // FIXME: this feels poorly scalable
    if (e.target.name === "stockBox") {
      this.props.onCheckboxChange(e.target.checked);
    } else {
      e.preventDefault()
      this.props.onFilterChange(e.target.value);
    }

  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          name="filterText"
          placeholder="Search..." 
          value={this.props.filterText}
          onChange={this.handleChange}/>
        <p>
          <input 
            type="checkbox" 
            name="stockBox"
            onChange={this.handleChange} 
            checked={this.props.stockedOnly} />
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
    this.state = { stockedOnly: false, filterText: '' };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleCheckboxChange(value) {
    console.log("Setting stockedOnly state to " + value);
    this.setState({ stockedOnly: value });

  }

  handleFilterChange(value) {
    this.setState({ filterText: value });
  }

  render() {
    const stockedOnly = this.state.stockedOnly;
    this.products = this.props.products;
    console.log("STATE IS NOW " + this.state.stockedOnly);
    return (
      <div>
        <SearchBar 
          onCheckboxChange={this.handleCheckboxChange}
          onFilterChange={this.handleFilterChange}
          stockedOnly={stockedOnly} 
          filterText={this.state.filterText}/>
        <ProductTable 
          products={this.products} 
          stockedOnly={stockedOnly} 
          filterText={this.state.filterText}/>
      </div>
    );
  }
}

