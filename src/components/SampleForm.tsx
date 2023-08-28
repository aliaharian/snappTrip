import React from "react";
import * as Yup from "yup";
import useForm from "../hooks/useForm";

const validationSchema: any = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
  avatar: Yup.mixed().required("Avatar is required"),
});

const SampleForm: React.FC = () => {
  const initialValues: any = {
    username: "",
    email: "",
    gender: "",
    acceptTerms: false,
    avatar: undefined,
  };

  const onSubmit = (values: any) => {
    // Handle form submission
    console.log("Submitted values:", values);
  };

  const form = useForm({ initialValues, validationSchema, onSubmit });

  console.log("form", form);
  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.values.username}
          onChange={(e) => form.handleChange("username", e.target.value)}
          onBlur={() => form.handleBlur("username")}
        />
        {form.errors.username && <div>{form.errors.username}</div>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={form.values.email}
          onChange={(e) => form.handleChange("email", e.target.value)}
          onBlur={() => form.handleBlur("email")}
        />
        {form.errors.email && <div>{form.errors.email}</div>}
      </div>

      <div>
        <label>Gender</label>
        <select
          name="gender"
          value={form.values.gender}
          onChange={(e) => form.handleChange("gender", e.target.value)}
          onBlur={() => form.handleBlur("gender")}
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {form.errors.gender && <div>{form.errors.gender}</div>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.values.acceptTerms}
            onChange={() =>
              form.handleChange("acceptTerms", !form.values.acceptTerms)
            }
          />
          Accept Terms
        </label>
        {form.errors.acceptTerms && <div>{form.errors.acceptTerms}</div>}
      </div>

      <div>
        <label>Avatar</label>
        <input
          type="file"
          name="avatar"
          onChange={(e) => form.handleChange("avatar", e.target.files?.[0])}
          onBlur={() => form.handleBlur("avatar")}
        />
        {form.errors.avatar && <div>{form.errors.avatar}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SampleForm;
