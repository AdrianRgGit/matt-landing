import CustomInput from "../../ui/customInput/CustomInput";
import { CustomSelect } from "../../ui/customSelect/CustomSelect";
import { CustomTextarea } from "../../ui/customTextarea/CustomTextarea";

export default function ContactForm() {
  return (
    <form>
      <p>Formulario</p>

      <div className="space-y-4 mt-6">
        <CustomInput label="Full Name" name="fullName" required />
        <CustomInput label="Email" name="email" type="email" required />
        <CustomInput label="Company" name="company" required />
        <CustomSelect
          label="Area of interest"
          name="interest"
          required
          options={[
            { label: "All", value: "all" },
            { label: "Spain", value: "es" },
            { label: "France", value: "fr" },
          ]}
        />

        <CustomTextarea label="Message" name="message" required />
      </div>
    </form>
  );
}
