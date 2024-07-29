import { Form, Input, Skeleton, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGetRandomCaptchaQuery } from "../redux/api/captcha/captchaApi";
import { useGetAllSecurityCodeQuery } from "../redux/api/securityCode/securityCodeApi";
import { useGetSingleVisaQuery } from "../redux/api/visa/visaApi";

const Homepage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const unikal_numb_query = searchParams.get("unikal_numb");
  const [form] = Form.useForm();

  const [unikal_numb, setUnikal_numb] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();

  const {
    data: captchaData,
    isLoading: isLoadingCaptcha,
    refetch: randomCaptchaRefetch,
  } = useGetRandomCaptchaQuery();
  const { data: securityCodeData, isLoading: isLoadingSecurityCode } =
    useGetAllSecurityCodeQuery();
  const securityCodes = securityCodeData?.data?.map((el) => el.codes).flat();
  const { data: visaData, isLoading: isLoadingVisa } = useGetSingleVisaQuery(
    unikal_numb_query || unikal_numb || "fff"
  );

  console.log(unikal_numb_query, "unikal_numb_query");

  const handleNext = () => {
    if (!unikal_numb_query) {
      if (captcha !== captchaData?.data?.data) {
        message.error("Captcha is not correct");
        return;
      } else if (!visaData) {
        message.error("Reference number is not correct");
        return;
      } else {
        navigate(`/?unikal_numb=${unikal_numb}`);
        return;
      }
    }

    if (securityCode && !securityCodes.includes(securityCode)) {
      message.error("Security code is not correct");
      return;
    } else {
      navigate(
        `/check-page?unikal_numb=${unikal_numb}&security_code=${securityCode}`
      );
      return;
    }
  };

  console.log(visaData, "visaData");

  return (
    <div className="min-h-screen pt-[110px] space-y-4 text-white">
      <div className="my-container space-y-8">
        <div className="border-2 border-dotted rounded-md space-y-[1px] max-w-4xl mx-auto p-4 font-semibold">
          <h2 className="font-semibold">Information box</h2>
          <p>
            {unikal_numb_query
              ? "Please, enter the security code in the box below to check status of your application or continue unfinished or returned application. If you do not have valid security code, click the button to receive it in your email."
              : "In order to check status of your application or continue unfinished application, please enter your application reference number in the relevant box. If you do not know this number, you can find it in the e-mail message that we sent to you. It is 8-symbol alphanumeric code."}
          </p>
        </div>

        {/* Input ref and check captcha */}
        <Form form={form} name={"evisaForm"}>
          <div className="w-[320px] mx-auto">
            {/* ref number */}
            {unikal_numb_query ? (
              <div className="space-y-2">
                <h2 className="text-white">Insert your security code</h2>
                {isLoadingSecurityCode ? (
                  <Skeleton.Button active className="!w-full !h-8" />
                ) : (
                  <Form.Item name={"securityCode"}>
                    <Input
                      placeholder="Enter your security code here"
                      className="my-inp"
                      onChange={(e) => setSecurityCode(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="text-white">Insert your reference number</h2>
                <Form.Item name={"referenceNumber"}>
                  <Input
                    placeholder="Enter your reference number here"
                    className="my-inp"
                    onChange={(e) => setUnikal_numb(e.target.value)}
                  />
                </Form.Item>
              </div>
            )}

            {/* check captcha */}
            {!unikal_numb_query && captchaData && (
              <div className="my-3">
                {isLoadingCaptcha ? (
                  <Skeleton.Button active className="!w-full !h-8" />
                ) : (
                  <div className="flex items-center gap-2">
                    <img src={captchaData?.data?.img} alt="captcha" />
                    <img
                      src="https://evisa.e-gov.kg/images/img/refresh_icon.png"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => randomCaptchaRefetch()}
                    />
                    <Form.Item name={"captchaCode"} className="!mb-0">
                      <Input
                        className="my-inp"
                        onChange={(e) => setCaptcha(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                )}
              </div>
            )}

            {/* submit button */}
            <div className="text-center">
              {
                <button
                  type="submit"
                  className="my-3 bg-slate-800 font-bold text-primary-1 border border-white hover:bg-primary-1 hover:primary-1 hover:text-white p-2 !px-4 rounded-md shadow-md"
                  onClick={handleNext}
                >
                  Next
                </button>
              }
            </div>
          </div>
        </Form>

        <div className="bg-white rounded-md shadow-md p-[24px] mt-[50px] text-black w-[60%] mx-auto font-semibold">
          May 1 to 5 have been declared days off in the Kyrgyz Republic.
        </div>
      </div>
    </div>
  );
};

export default Homepage;
