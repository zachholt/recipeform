import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

export default function RecipeForm() {
    const keys: ("title" | "ingredients" | "instructions")[] = ["title", "ingredients", "instructions"];

    const validationSchema = yup.object({
        title: yup.string().min(5).required('Title is required'),
        ingredients: yup.string().matches(/([a-zA-Z0-9., ]+\n){5}/, "enter at least 5 ingredients").required('Five Ingredients are required'),
        instructions: yup.string().min(5).required('Instructions are required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    useEffect(()=> {console.log(errors)}, [errors])

    // Handle form submission
    const onSubmit = (data: any, e:any) => {
        console.log(data);
        e?.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {keys.map((key) => (
                <div key={key}>
                    <label>{key}</label>
                    <textarea id={key} {...register(key)} />
                    {/* Show error message if field does not meet validationSchema */}
                    {errors[key] && <p>{errors[key]?.message}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}