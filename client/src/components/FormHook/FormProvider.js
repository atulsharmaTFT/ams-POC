import PropTypes from "prop-types";
import { FormProvider as Form } from "react-hook-form";
import Button from "../Button/Button";

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  buttonName,
  overrideClassName
}) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>
        {children}
        <Button
          type="submit"
          overrideClassName={overrideClassName}
          buttonText={buttonName}
          onClick={onSubmit}
          loading={false}
        />
      </form>
    </Form>
  );
}
