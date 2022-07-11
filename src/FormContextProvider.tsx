import React, { FormHTMLAttributes, FunctionComponent } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

export type FormContextProps = {
  defaultValues?: any;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (values: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (values: any) => void;
  formContext?: UseFormReturn<any>;
  FormProps?: FormHTMLAttributes<HTMLFormElement>;
};

/**
 *  Read up on react  hook FormProvider
 *  https://react-hook-form.com/advanced-usage#FormProviderPerformance
 *  Using context  (https://beta.reactjs.org/learn/passing-data-deeply-with-context)
 */

const FormContextCore: FunctionComponent<
  React.PropsWithChildren<FormContextProps>
> = ({ defaultValues = {}, onSubmit = () => {}, FormProps, children }) => {
  const methods = useForm<typeof defaultValues>({
    defaultValues
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate {...FormProps}>
        {children}
      </form>
    </FormProvider>
  );
};

const FormContextProvider: FunctionComponent<
  React.PropsWithChildren<FormContextProps>
> = (props) => {
  const { formContext, handleSubmit, children, onSubmit, FormProps } = props;
  if (!formContext && !handleSubmit) {
    return <FormContextCore {...props} />;
    // eslint-disable-next-line no-else-return
  } else if (handleSubmit && formContext) {
    return (
      <FormProvider {...formContext}>
        <form noValidate {...FormProps} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormProvider>
    );
  }

  if (formContext && onSubmit) {
    return (
      <FormProvider {...formContext}>
        <form
          onSubmit={formContext.handleSubmit(onSubmit)}
          noValidate
          {...FormProps}
        >
          {children}
        </form>
      </FormProvider>
    );
  }

  return <div>Incomplete setup of FormContainer..</div>;
};

export default FormContextProvider;
