import { Card } from "antd";
import "./subCategoryCard.css";

export const SubCategoryCard = (props) => {
  // const { subCategory } = props;

  return (
    <>
    <div className="card-bg"></div>
      <Card
        hoverable
        style={{
          width: 240,
        }}
      >

        {/* <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /> */}
      </Card>

    </>
  );
};