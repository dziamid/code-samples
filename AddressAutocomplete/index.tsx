import * as React from 'react';
import {ILoadOptionsAction, loadOptions, optionSelected} from './actions';
const {connect} = require('react-redux');
import {Dispatch, Action, ActionCreator, bindActionCreators} from 'redux';
import Immutable, {Map, List} from 'immutable';
import {omit, toPath} from 'lodash';
import {Select, ISelectProps, ISelectOption} from 'components/Select';
import ReduxFormAdapter from "components/Select/ReduxFormAdapter";
import {getFieldValue, getSiblingFieldId} from "../../utils/form";
import {IDatasourceAutocomplete} from "../../types/datasource";

export interface IAddressAutocompleteProps extends ISelectProps {
  loadOptions: ActionCreator<ILoadOptionsAction>;
  optionSelected: ActionCreator<Action>;
  fieldId: string;
}

class AddressAutocompleteComponent extends React.Component<IAddressAutocompleteProps, {}> {

  handleInputChange = (query: string) => {
    this.props.loadOptions(query, this.props.fieldId);
  }

  handleChange = (option: ISelectOption) => {
    this.props.optionSelected(option, this.props.fieldId);
  }

  render() {
    const {dataSource, loadOptions, ...innerProps} = this.props;

    return (
      <Select
        {...innerProps}
        onChange={this.handleChange}
        dataSource={dataSource}
        onInputChange={this.handleInputChange}
        filterOption={() => true}
      />
    );
  }
}

const getDataSource = (fieldId: string) => (state: Map<string, any>) => {
  const dataSource = getFieldValue(state)(getSiblingFieldId(fieldId, 'options'));

  return List.isList(dataSource) ? dataSource.toJS() : dataSource;
};

const mapStateToProps = (state: Map<string, any>, props: IAddressAutocompleteProps) => ({
  dataSource: getDataSource(props.fieldId)(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  loadOptions,
  optionSelected,
}, dispatch);

export const AddressAutocomplete = connect(mapStateToProps, mapDispatchToProps)(AddressAutocompleteComponent);

export default ReduxFormAdapter(AddressAutocomplete);
