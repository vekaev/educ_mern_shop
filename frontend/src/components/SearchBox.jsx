import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    const pathKeyword = history.location.pathname.split("/");
    if (pathKeyword[1] === "search") {
      setKeyword(pathKeyword[2]);
    }
  }, [history.location.pathname]);

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        value={keyword}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products...."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
