import React from 'react'
import { useForm } from 'react-hook-form';
import classes from "./AddNewUser.module.scss"

function AddNewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit=(data)=>{
    console.log('data', data)
    reset();
  }
  return (
    <>
    
    <form className={classes.employeeForm} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Employee ID:
        <input type="text" {...register('employeeId', { required: 'This field is required' })} />
        {errors.employeeId && <p>{errors.employeeId.message}</p>}
      </label>

      <label>
        Name:
        <input type="text" {...register('name', { required: 'This field is required' })} />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label>
        Email:
        <input
          type="email"
          {...register('email', { required: 'This field is required', pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </label>

      <label>
        Manager Name:
        <input type="text" {...register('managerName', { required: 'This field is required' })} />
        {errors.managerName && <p>{errors.managerName.message}</p>}
      </label>

      <label>
        Designation:
        <input type="text" {...register('designation', { required: 'This field is required' })} />
        {errors.designation && <p>{errors.designation.message}</p>}
      </label>

      <label>
        Department:
        <input type="text" {...register('department')} />
        {errors.department && <p>{errors.department.message}</p>}
      </label>

      <label>
        Joining Date:
        <input type="date" {...register('joiningDate')} />
        {errors.joiningDate && <p>{errors.joiningDate.message}</p>}
      </label>

      <button type="submit">Add Employee</button>
    </form>
    </>
  )
}

export default AddNewUser