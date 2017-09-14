import * as React from 'react';
import * as ReactSelect from 'react-select';
import {WrappedFieldInputProps, WrappedFieldProps} from 'redux-form';

type ReactComponentConstructor = new() => React.Component<any, any>;

interface IWrappedFieldInputProps extends WrappedFieldInputProps {
  onBlur: any;
  value: any;
}

interface IReduxFormFieldProps extends WrappedFieldProps<any> {
  input: IWrappedFieldInputProps;
}

/**
 * Maps redux form props to react-select props
 *
 */
const mapReduxFormProps = (props: IReduxFormFieldProps) => {
  const {
    input,
    meta: {touched, error},
    input: {onChange, onBlur, value},
    ...customProps,
  } = props;

  return {
    ...customProps,
    error: touched && error,
    onChange,
    //fixes issue when value is lost on blur
    //https://github.com/erikras/redux-form/issues/82
    onBlur: () => onBlur(value),
  };
};

const ReduxFormAdapter = (Component: ReactComponentConstructor) =>
  (props: IReduxFormFieldProps) => {
    const mappedProps = mapReduxFormProps(props);

    return <Component {...mappedProps} />;
  };

export default ReduxFormAdapter;
