import {
    Box,
    Button,
    Center,
    Group,
    TextInput,
    createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";

const useStyles = createStyles((theme) => ({
  wrapper: {
    marginTop: "1rem",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors.blue[3]} 0%, ${theme.colors.blue[7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 5)`,

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 3)`,
    },
  },
  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
    width: "100%",
    [theme.fn.smallerThan("md")]: {
      width: "600px",
    },
  },
  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },
  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(10, "Password must be at least 8 characters")
    .required("Message is required"),
});

interface FormValues {
    email: string;
    password: string;
}

export default function SignIn() {
  const { classes } = useStyles();
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Center className={classes.wrapper}>
      <Box
        maw={600}
        className={classes.form}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          classNames={{ input: classes.input, label: classes.inputLabel }}
        />
        <TextInput
          type="password"
          label="Password"
          placeholder="********"
          {...form.getInputProps("password")}
          classNames={{ input: classes.input, label: classes.inputLabel }}
        />
        <Group
          position="right"
          mt="md"
        >
          <Button
            type="submit"
            className={classes.control}
          >
            Sign in
          </Button>
        </Group>            
        </form>
      </Box>
    </Center>
  );
}
