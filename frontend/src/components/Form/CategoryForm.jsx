import React from "react";
import styles from "./form.module.scss"

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
     <section className={`container ${styles.auth}`}>
    <div className={styles.form}>
    <form onSubmit={handleSubmit}>
    <h2 style={{color:"white",fontWeight:"bolder"}}>Manage Category</h2>
    <input 
    type="text"
    className="form-control new_category"
    placeholder='Enter New Category'
    required
    value={value}
    onChange={(e)=>{
        setValue(e.target.value)
    }} />
    <button style={{position:'relative',top:"2rem"}}
    type='submit'
    className='--btn --btn-primary --btn-block'
    >Submit</button>
    </form>
    </div>
     </section>
    

    </>
  );
};

export default CategoryForm;