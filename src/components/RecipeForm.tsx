import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import './RecipeForm.css'; // Import the CSS file


export default function RecipeForm() {
    const keys: ("title" | "ingredients" | "instructions")[] = ["title", "ingredients", "instructions"];

    const validationSchema = yup.object({
        title: yup.string().min(5).required('Title is required'),
        ingredients: yup.string().matches(/^(\s*\w+\s*,){4,}\s*\w+\s*$/, "enter at least 5 ingredients").required('Five Ingredients are required'),
        instructions: yup.string().min(5).required('Instructions are required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    useEffect(() => { console.log(errors) }, [errors])

    // Handle form submission
    const onSubmit = (data: any, e: any) => {
        console.log(data);
        e?.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>{"Enter a Recipe"}</h3>

            {keys.map((key) => (
                <div key={key}>

                    <label>
                        {key.toUpperCase()}
                        {key === 'ingredients' && (
                            <small style={{ display: 'block', fontWeight: 'normal' }}>
                                (Please enter at least 5 ingredients separated by commas)
                            </small>
                        )}
                    </label>
                    <textarea id={key} {...register(key)} />

                    {/* Show error message if field does not meet validationSchema */}
                    {errors[key] && <p>{errors[key]?.message}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}