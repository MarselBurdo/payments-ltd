import {
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  DateInput,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  useCreate,
  useGetIdentity,
  useNotify,
} from 'react-admin';

import { contactInputText, contactOptionText } from '@/misc/ContactOption';
import { useConfigurationContext } from '@/root/ConfigurationContext';

const validateRequired = required();

export const PaymentInputs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Stack gap={4} p={1}>
      <DealInfoInputs />

      <Stack gap={4} flexDirection={isMobile ? 'column' : 'row'}>
        <DealLinkedToInputs />
        <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
        <PaymentMiscInputs />
      </Stack>
    </Stack>
  );
};

const DealInfoInputs = () => {
  return (
    <Stack gap={1} flex={1}>
      <TextInput
        source="name"
        label="Payment name"
        validate={validateRequired}
        helperText={false}
      />
      <TextInput source="description" multiline rows={3} helperText={false} />
    </Stack>
  );
};

const DealLinkedToInputs = () => {
  const [create] = useCreate();
  const notify = useNotify();
  const { identity } = useGetIdentity();

  const handleCreateCompany = async (name?: string) => {
    if (!name) return;
    try {
      const newCompany = await create(
        'companies',
        {
          data: {
            name,
            sales_id: identity?.id,
            created_at: new Date().toISOString(),
          },
        },
        { returnPromise: true }
      );
      return newCompany;
    } catch (error) {
      notify('An error occurred while creating the company', {
        type: 'error',
      });
    }
  };
  return (
    <Stack gap={1} flex={1}>
      <Typography variant="subtitle1">Linked to</Typography>
      <ReferenceInput source="company_id" reference="companies">
        <AutocompleteInput
          optionText="name"
          onCreate={handleCreateCompany}
          validate={validateRequired}
          helperText={false}
        />
      </ReferenceInput>

      <ReferenceArrayInput source="contact_ids" reference="contacts_summary">
        <AutocompleteArrayInput
          label="Contacts"
          optionText={contactOptionText}
          inputText={contactInputText}
          helperText={false}
        />
      </ReferenceArrayInput>
    </Stack>
  );
};

const PaymentMiscInputs = () => {
  const { paymentStages, paymentCategories } = useConfigurationContext();
  return (
    <Stack gap={1} flex={1}>
      <Typography variant="subtitle1">Misc</Typography>

      <SelectInput
        source="category"
        label="Category"
        choices={paymentCategories.map(type => ({
          id: type,
          name: type,
        }))}
        helperText={false}
      />
      <NumberInput
        source="amount"
        defaultValue={0}
        validate={validateRequired}
        helperText={false}
      />
      <DateInput
        source="expected_closing_date"
        fullWidth
        validate={[validateRequired]}
        helperText={false}
        inputProps={{ max: '9999-12-31' }}
        defaultValue={new Date().toISOString().split('T')[0]}
      />
      <SelectInput
        source="stage"
        choices={paymentStages.map(stage => ({
          id: stage.value,
          name: stage.label,
        }))}
        validate={validateRequired}
        defaultValue="opportunity"
        helperText={false}
      />
    </Stack>
  );
};
