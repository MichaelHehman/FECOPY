import React, { useState } from "react";
import { Button, Card, List, Modal, Form, Input } from "antd";
import "./Profile.module.css";

const Profile = () => {
  const [householdMembers, setHouseholdMembers] = useState([
    { name: "Shreya Thapa", email: "Shreya.thapa@example.com" },
    { name: "Shova Thapa", email: "Shova.Thapa@example.com" },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showAddMemberModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddMember = () => {
    form.validateFields().then((values) => {
      setHouseholdMembers([...householdMembers, values]);
      setIsAddModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const deleteHouseholdMember = (email) => {
    setHouseholdMembers(householdMembers.filter((member) => member.email !== email));
  };

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
          />
        </div>
        <h2 className="profile-name">Dikshya Thapa</h2>
        <p className="profile-email">dikshya.thapa@example.com</p>
      </div>

      {/* Household Members */}
      <div className="household-members">
        <h3 className="section-title">Household Members</h3>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={householdMembers}
          renderItem={(member) => (
            <List.Item>
              <Card
                className="member-card"
                cover={
                  <img
                    alt={member.name}
                    src="https://via.placeholder.com/100" // Replace with user-uploaded image
                  />
                }
                actions={[
                  <Button onClick={() => deleteHouseholdMember(member.email)}>Delete</Button>,
                ]}
              >
                <Card.Meta
                  title={member.name}
                  description={member.email}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </List.Item>
          )}
        />
        <Button className="add-user-btn" onClick={showAddMemberModal}>
          + Add Member
        </Button>
      </div>

      {/* Add Member Modal */}
      <Modal
        title="Add New Member"
        visible={isAddModalVisible}
        onOk={handleAddMember}
        onCancel={handleCancelAdd}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter the full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Form>
      </Modal>
      {/* Footer Navigation */}
      <div className="footer-buttons">
        <Button>Home</Button>
        <Button>Settings</Button>
        <Button>Logout</Button>
      </div>
    </div>
    
  );
};

export default Profile;


