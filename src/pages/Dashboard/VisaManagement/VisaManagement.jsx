import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Modal,
  Input,
  Form,
  message,
  Skeleton,
  Upload,
  Switch,
  Tooltip,
} from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateVisaMutation,
  useDeleteVisaMutation,
  useGetAllVisaQuery,
  useUpdateVisaMutation,
} from "../../../redux/api/visa/visaApi";
import { BsEye } from "react-icons/bs";

const VisaManagement = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const { data: visaData, refetch, isLoading, } = useGetAllVisaQuery(pagination);
  const [deleteVisa, { isLoading: deleteVisaIsLoading }] = useDeleteVisaMutation();
  const [createVisa, { isLoading: createVisaIsLoading }] =
    useCreateVisaMutation();
  const [updateVisa, { isLoading: updateVisaIsLoading }] =
    useUpdateVisaMutation();
  const [editingVisa, setEditingVisa] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  //   Update input value
  useEffect(() => {
    if (editingVisa) {
      form.setFieldsValue({
        userImg: editingVisa.userImg,
        visaApplicationStatus: editingVisa.visaApplicationStatus,
        applicationStatusDate: editingVisa.applicationStatusDate,
        referenceNumber: editingVisa.referenceNumber,
        passportCountry: editingVisa.passportCountry,
        passportType: editingVisa.passportType,
        passportNumber: editingVisa.passportNumber,
        passportIssueDate: editingVisa.passportIssueDate,
        passportExpirationDate: editingVisa.passportExpirationDate,
        name: editingVisa.name,
        surname: editingVisa.surname,
        middleNameOrPatronymic: editingVisa.middleNameOrPatronymic,
        birthDate: editingVisa.birthDate,
        visaType: editingVisa.visaType,
        visaDuration: editingVisa.visaDuration,
        entryTimes: editingVisa.entryTimes,
        visaValidityPeriod: editingVisa.visaValidityPeriod,
      });
    } else {
      form.resetFields();
    }
  }, [editingVisa, form]);

  const handleAddToVisa = async (values) => {
    const {visaDuration, ...restValues} = values || {}
    try {
      const res = await createVisa({...restValues, visaDuration: Number(visaDuration), userQrCodeImg: "https://i.ibb.co/zNckTjr/qrcode.png"}).unwrap();
      message.success(res?.message || "Visa successfully created!", 1.5);
      refetch();
      form.resetFields()
      setModalVisible(false);
    } catch (error) {
      message.error(error.data?.message || "Visa created failed!", 1.5);
    }
  };

  const handleUpdateVisa = async (values) => {
    const {visaDuration} = values || {}
    try {
      const res = await updateVisa({
        ...values,
        visaDuration: Number(visaDuration),
        _id: editingVisa?._id,
      }).unwrap();

      message.success(res?.message || "Visa successfully updated!", 1.5);
      refetch();
      setModalVisible(false);
    } catch (error) {
      message.error(error.message || "Visa update failed!", 1.5);
    }
  };

  const handleDeleteVisa = async (id) => {
    try {
      const res = await deleteVisa(id._id).unwrap();
      message.success(res.data?.message || "Visa successfully deleted!", 1.5);
      refetch();
    } catch (error) {
      message.error(error.data?.message || "Visa delete failed!", 1.5);
    }
  };

  const handleModalCancel = () => {
    setEditingVisa(null);
    setModalVisible(false);
    form.resetFields();
  };

  const openModalForEditing = (record) => {
    setEditingVisa(record);
    setModalVisible(true);
  };

  // View details modal
  const showViewDetailsModal = (record) => {
    setSelectedRecord(record);
    setIsViewDetailsModalVisible(true);
  };
  const handleViewDetailsModalCancel = () => {
    setIsViewDetailsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      dataIndex: "userImg",
      title: "User Image",
      key: "userImg",
      render: (text, record) => (
        <img
          src={record.userImg}
          alt=""
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Visa Application Status",
      dataIndex: "visaApplicationStatus",
      key: "visaApplicationStatus",
    },
    {
      title: "Application Status Date",
      dataIndex: "applicationStatusDate",
      key: "applicationStatusDate",
    },
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<BsEye />}
            onClick={() => showViewDetailsModal(record)}
          >
            View
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<MdDriveFileRenameOutline />}
            onClick={() => openModalForEditing(record)}
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Visa?"
            onConfirm={() => handleDeleteVisa(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              icon={<RiDeleteBin6Line />}
              type="primary"
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const visaUploadFormData = [
    {
      name: "userImg",
      label: "User Image",
      placeholder: "Enter user image URL",
    },
    {
      name: "visaApplicationStatus",
      label: "Visa Application Status",
      placeholder: "Enter visa application status",
    },
    {
      name: "applicationStatusDate",
      label: "Application Status Date",
      placeholder: "Enter application status date",
    },
    {
      name: "referenceNumber",
      label: "Reference Number",
      placeholder: "Enter reference number",
    },
    {
      name: "passportCountry",
      label: "Passport Country",
      placeholder: "Enter passport country",
    },
    {
      name: "passportType",
      label: "Passport Type",
      placeholder: "Enter passport type",
    },
    {
      name: "passportNumber",
      label: "Passport Number",
      placeholder: "Enter passport number",
    },
    {
      name: "passportIssueDate",
      label: "Passport Issue Date",
      placeholder: "Enter passport issue date",
    },
    {
      name: "passportExpirationDate",
      label: "Passport Expiration Date",
      placeholder: "Enter passport expiration date",
    },
    {
      name: "name",
      label: "Name",
      placeholder: "Enter name",
    },
    {
      name: "surname",
      label: "Surname",
      placeholder: "Enter surname",
    },
    {
      name: "middleNameOrPatronymic",
      label: "Middle Name or Patronymic",
      placeholder: "Enter middle name or patronymic",
    },
    {
      name: "birthDate",
      label: "Birth Date",
      placeholder: "Enter birth date",
    },
    {
      name: "visaType",
      label: "Visa Type",
      placeholder: "Enter visa type",
    },
    {
      name: "visaDuration",
      label: "Visa Duration",
      placeholder: "Enter visa duration",
    },
    {
      name: "entryTimes",
      label: "Entry Times",
      placeholder: "Enter entry times",
    },
    {
      name: "visaValidityPeriod",
      label: "Visa Validity Period",
      placeholder: "Enter visa validity period",
    },
  ];

  // console.log(visaData, 'VisaData');

  return (
    <div>
      <div className="my-container space-y-12 md:space-y-16">
        <div className="flex justify-end mr-5 my-5">
          {isLoading ? (
            <Skeleton.Input active={true} />
          ) : (
            <Button
              onClick={() => {
                setEditingVisa(null);
                setModalVisible(true);
              }}
              type="primary"
              size="middle"
              icon={<MdDriveFileRenameOutline />}
            >
              Add Visa
            </Button>
          )}
        </div>
        {isLoading ? (
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Table
            dataSource={visaData?.data}
            columns={columns}
            rowKey="_id"
            scroll={{ x: 800 }}
            pagination={{
              total: visaData?.meta?.total,
              onChange: (page, pageSize) => {
                setPagination({ page, pageSize });
              },
            }}
          />
        )}
        {/* Update modal */}
        <Modal
          title={editingVisa ? "Update Visa" : "Add Visa"}
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form
            form={form}
            name="VisaForm"
            onFinish={editingVisa ? handleUpdateVisa : handleAddToVisa}
            layout="vertical"
            className="max-h-[600px] overflow-y-scroll pr-2"
          >
            {visaUploadFormData?.map((elem, ind) => {
              return (
                <Form.Item
                  key={ind}
                  label={elem.label}
                  name={elem.name}
                  rules={[
                    {
                      required: editingVisa || elem?.name == 'middleNameOrPatronymic' ? false : true,
                      message: `Please enter ${elem.label}`,
                    },
                  ]}
                >
                  <Input placeholder={elem.placeholder} />
                </Form.Item>
              );
            })}

            <Form.Item>
              {editingVisa ? (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={updateVisaIsLoading}
                >
                  {" "}
                  Update Visa
                </Button>
              ) : (
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={createVisaIsLoading}
                >
                  Add Visa
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>

        {/* View details modal */}
        <Modal
          // title="Contact Us Details"
          onCancel={handleViewDetailsModalCancel}
          onOk={handleViewDetailsModalCancel}
          open={isViewDetailsModalVisible}
        >
          {selectedRecord && (
            <div className="space-y-2">
              <h2 className="font-bold text-xl md:text-2xl text-center !mb-4">
                Visa details
              </h2>

              <p className="flex gap-1 flex-wrap">
                <strong>Visa application status:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.visaApplicationStatus}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Application status date:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.applicationStatusDate}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Reference number:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.referenceNumber}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Name:</strong>
                <p className="text-normal-desc">{selectedRecord.name}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Surname:</strong>
                <p className="text-normal-desc">{selectedRecord.surname}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Passport Country:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportCountry}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Passport Type:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportType}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Passport Number:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportNumber}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Passport Issue Date:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportIssueDate}
                </p>
              </p>

              <p className="flex gap-1 flex-wrap">
                <strong>Passport Expiration Date:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.passportExpirationDate}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Middle name:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.middleNameOrPatronymic}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Birth date:</strong>
                <p className="text-normal-desc">{selectedRecord.birthDate}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Visa type:</strong>
                <p className="text-normal-desc">{selectedRecord.visaType}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Visa duration:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.visaDuration}
                </p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Entry times:</strong>
                <p className="text-normal-desc">{selectedRecord.entryTimes}</p>
              </p>
              <p className="flex gap-1 flex-wrap">
                <strong>Visa validity period:</strong>
                <p className="text-normal-desc">
                  {selectedRecord.visaValidityPeriod}
                </p>
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default VisaManagement;
