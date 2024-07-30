import { Button, Form, Input, Skeleton, message } from "antd";
import Container from "../Components/ui/Container";
import { RiVisaFill } from "react-icons/ri";
import { FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import pdfHeader from '../assets/pdfHeader.png'
import qrCode from '../assets/qrcode.png'
import pdfFooter from '../assets/pdfBottom.png'

const Homepage = () => {
  const [form] = Form.useForm();
  const visaData = {}

  const printContentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    // evisa.e-gov.kg_printStatus.php_lng=en&unikal_numb=70126357
    documentTitle: `serbia-evisa-portal=${visaData?.data?.referenceNumber}`,
    // onBeforePrint: () => {console.log("before printing...");},
    // onAfterPrint: () => {console.log("after printing...");},
    removeAfterPrint: false,
  });



  const handleSubmitId = (data) => {
    console.log(data);
  }


  return (
    <Container>
      <div className="my-4 mb-8 !px-[20px] sm:!px-[50px] md:!px-[110px] p-8 rounded-md border border-primary">
        <div className="flex gap-2 items-center">
          <span className="bg-primary rounded-full text-white text-xl p-2"><RiVisaFill /></span>
          <h2 className="flex-1 border-b border-primary text-xl text-primary font-semibold">Portal of Serbia e-Visa</h2>
        </div>

        <Form form={form} layout="vertical"
          className="my-4"
          name="eVisaIdForm"
          //  style={{ maxWidth: 600 }}
          onFinish={handleSubmitId}
          autoComplete="off"
        >
          <Form.Item
            label="e-Visa ID"
            name="id"
            rules={[{ required: true, message: 'Please input your ID!' }]}
          >
            <Input placeholder="Enter ID here" className="w-[200px] rounded-none" />
          </Form.Item>

          <Button size="large" htmlType="submit" className="secondary-btn rounded-none ml-auto">Confirm <FaAngleRight /></Button>

        </Form>
      </div>




      {/* Conditional render: If got visa then show */}
      <div>
        <button
          type="submit"
          onClick={() => {
            handlePrint();
          }}
          className="primary-btn"
        >
          Print
        </button>
        {/* Component to be print */}
        <div
          className={`font-bold bg-white min-h-screen text-black text-center print-content-font}`}
          id="printContent"
          ref={printContentRef}
        >
          <div className="mx-[60px] py-4 space-y-3">
            {/* Header */}
            <img src={pdfHeader} alt="Serbia eVisa portal" />

              {/* Sub header */}
            <div className="px-[13px]">
              <h2>ОБАВЕШТЕЊЕ О ДОДАВАЊУ Е-ВИЗЕ</h2>
              <h2>NOTIFICATION OF GRANTING AN E-VISA</h2>
            </div>

            {/* visa data*/}
            <div className="relative overflow-x-auto mb-6 mt-2 text-slate-800 font-normal space-y-[2px] !text-left">

              {/* Детаљи апликације/ Application details  + Ово је да обавестите е-визу која је издата/ This is to inform an e-visa issued to */}
              <div className="flex justify-between gap-4">

                <div className="font-semibold space-y-1">
                  <h2 className="font-bold">Детаљи апликације/ Application details</h2>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] leading-[16px] p-2">ид апликације/ <br />
                      Application ID</h2>
                    <p>TODO - 555-3354435-3</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">Датум подношења захтева/ <br /> Date of Application
                    </h2>
                    <p>TODO - 15.05.2022</p>
                  </div>

                  <h2 className="font-bold leading-[16px]">Ово је да обавестите е-визу која је издата/ <br /> This is to inform an e-visa issued to</h2>

                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1">Презиме/ Surname</h2>
                    <p>TODO - Surname</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1">Име / Given name(s)</h2>
                    <p>TODO - Given name</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1">Датум рођења / Date of birth(s)</h2>
                    <p>TODO - DOB</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1">Сек / Sex</h2>
                    <p>TODO - sex</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1">националност / Nationality</h2>
                    <p>TODO - Bangladeshi</p>
                  </div>
                  <div className="flex gap-4">
                    <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px] ">Број путне исправе / <br />
                      Travel document number</h2>
                    <p>TODO - A548574574</p>
                  </div>

                </div>

                <img src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" className="w-[150px] h-[150px]" alt="serbia eVisa portal" />
              </div>


              {/* Детаљи о е-визама / E-visa details */}
              <div className="font-semibold space-y-1">
                <h2 className="font-bold">Детаљи о е-визама / E-visa details</h2>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">Важење е-визе / E-visa validity</h2>
                  <p>TODO - 15.05.2022 20.09.2022</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">Трајање боравка (дана) / Duration of stay (days) Број уноса / <br />
                    Number of Entries</h2>
                  <p>TODO - 180 day</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">Категорија електронске визе / Category of electronic visa</h2>
                  <p>РАД / WORK</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">Број одлуке о додели е-визе / <br /> E-visa grant decision number</h2>
                  <p>TODO - R2-53534-fff</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]"> Датум одлуке о додели е-визе / <br /> E-visa grant decision date</h2>
                  <p>TODO - 21.06.2024</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]"> Е-виза Ид / E-visa ID</h2>
                  <p>TODO - RS645jkj</p>
                </div>
                <div className="flex gap-4">
                  <h2 className="bg-gray-300 w-[280px] p-1 leading-[16px]">код за верификацију е-визе / <br /> E-visa Verification Code</h2>
                  <p>TODO - 4R320JNM-6YRT-1A0P-I9MO-6V8US23QАВ</p>
                </div>
              </div>


            </div>

            {/* PDF footer */}
            <div>

            <div className="flex justify-between items-center gap-2">
              <img src={qrCode} alt="Serbia eVisa portal" className="h-[180px] w-[180px]" />

              <div className="!font-bold text-black text-left space-y-4">
                <p style={{wordSpacing: '20px'}} className="leading-[16px]">Молимо понесите ОВО обавештење ca собом И покажите транспортну фирму ради провере е-визе.</p>

                <p style={{wordSpacing: '18px'}} className="leading-[16px]">Please bring this notification with you and show transport company for a e-visa check.</p>

                <p className="font-normal leading-[16px]">
                  {/* TODO: name can be replace space to < */}
                  V{"<"}BGD JILANI{"<<"}SHEIKH{"<"}HALIM{"<"}AHMAD{"<<<<<<<<<"} A031374462 BGD0012016M32020781965559220{"<<<<"}64
                </p>

              </div>
            </div>
            <img src={pdfFooter} alt="" />
            </div>


          </div>
        </div>
      </div>

    </Container>

  );
};

export default Homepage;
