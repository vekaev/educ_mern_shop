import { Helmet } from "react-helmet";

export const Meta = ({ title }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content="We sell the best products" />
    <meta name="keywords" content="electronics" />
  </Helmet>
);
