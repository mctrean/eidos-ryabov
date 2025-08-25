import React from "react";
import { Result } from "antd";

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы ищете, не найдена или находится в разработке."
    />
  );
};

export default NotFound;
