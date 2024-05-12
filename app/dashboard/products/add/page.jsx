import React from 'react'
import styles from "../../../ui/dashboard/products/addProduct/addProduct.module.css";
import {addProduct} from "../../../lib/actions"

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form
        action={addProduct}
        className={styles.form}
      >
        {/* name important cause we will push this item into db using this name */}
        <input
          type="text"
          placeholder="title"
          name="title"
          required
        />
        <select
          name="category"
          id="category"
          required
        >
          <option value="general">Choose a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input
          type="number"
          placeholder="price"
          name="price"
          required
        />
        <input
          type="number"
          placeholder="stock"
          name="stock"
          required
        />
        <input
          type="text"
          placeholder="color"
          name="color"
          required
        />
        <input
          type="text"
          placeholder="size"
          name="size"
          required
        />
        <textarea
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProductPage