import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaClock,
  FaHome,
} from "react-icons/fa";
import { Layout, Menu } from "antd";
import moment from "moment";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const DashboardLayout = () => {
  const [time, setTime] = useState(null)
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  useEffect(()=> {
    const interval = setInterval(()=> {
      setTime(moment().format("LTS"))
    }, 1000)

    return ()=> {
      clearInterval(interval)
    }
  }, [])

  
const items = [
  getItem("Dashboard", "/dashboard/eVisaXXYY", <FaHome />),

];



  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   position: "fixed",
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        // }}
      >
        <Menu theme="dark">
          <div>
            <div className=" flex justify-center mt-5">
              <img
                src={'https://evisa.e-gov.kg/images/img/logo.png'}
                alt="e-VISA"
                className="inline-block !w-[100px] md:!w-[150px] !mt-[8px]"
              />
            </div>
          </div>

        </Menu>

        <div className="demo-logo-vertical" />

        <Menu
          onClick={({ key }) => {
            key ? navigate(key) : navigate("/dashboard");
          }}
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          className="py-6"
          items={items}
        />
      </Sider>

      <Layout
      // style={{
      //   marginLeft: 200,
      // }}
      >
        <Header>
          <div className="demo-logo" />
          <Menu mode="horizontal" theme="dark">
          <h2 className="text-white font-bold flex items-center gap-1 pr-2"><FaClock/>{time}</h2>
          </Menu>
        </Header>

        <Content>
          <div
            style={{
              padding: 0,
              minHeight: 360,
              // background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
