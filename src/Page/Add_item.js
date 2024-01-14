import React from 'react';
import { useForm } from 'react-hook-form';

const Add_item = ({ AddItem }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleFormSubmit = (data) => {
        AddItem({
            title: data.title,
            description: "Your Description Here"
        });
        reset();
    };

    return (
        <div style={{ marginTop: '30px' }} className='add-item'>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <input
                    type="text"
                    placeholder='Add an item...'
                    {...register('title', { required: true })}
                />
                <button type="submit">Add</button>
            </form>

            {errors.title?.type === "required" && <small>This field requires an input</small>}
        </div>
    );
}

export default Add_item;
