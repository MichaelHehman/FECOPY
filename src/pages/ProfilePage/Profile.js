import React, { useState, useCallback, useMemo } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from "./Profile.module.css";

// Separate component for member card to prevent unnecessary re-renders
const MemberCard = React.memo(({ 
  member, 
  isCurrentUser, 
  onEdit, 
  onDelete 
}) => (
  <div className={styles.memberCard}>
    <img 
      src={member.avatar} 
      alt={member.name} 
      className={styles.memberImage}
    />
    <h3>{member.name}</h3>
    <p>{member.email}</p>
    <div className={styles.memberActions}>
      <Button 
        className={styles.actionButton}
        onClick={() => onEdit(member)}
      >
        <EditOutlined />
      </Button>
      {!isCurrentUser && (
        <Button 
          className={styles.actionButton}
          onClick={() => onDelete(member.email)}
        >
          <DeleteOutlined />
        </Button>
      )}
    </div>
  </div>
));

// Constants
const DEFAULT_PHOTOS = {
  pet1: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop",
  pet2: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop",
  pet3: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&auto=format&fit=crop",
  pet4: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop"
};

const INITIAL_MEMBERS = [
  {
    name: "Nhi Nguyen",
    email: "nhi_nguyen@gmail.com",
    phone: "123-456-7890",
    avatar: DEFAULT_PHOTOS.pet1,
    joinDate: "3 months ago"
  },
  { 
    name: "Jane Smith",
    email: "user2@gmail.com",
    phone: "123-456-7891",
    avatar: DEFAULT_PHOTOS.pet2
  },
  { 
    name: "Mike Johnson",
    email: "user3@gmail.com",
    phone: "123-456-7892",
    avatar: DEFAULT_PHOTOS.pet3
  },
  {
    name: "DIKSHYA THAPA",
    email: "dikshyathapa1430@outlook.com",
    phone: "123-456-7893",
    avatar: DEFAULT_PHOTOS.pet4
  }
];

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [householdMembers, setHouseholdMembers] = useState(INITIAL_MEMBERS);
  const [form] = Form.useForm();

  // Memoized current user
  const currentUser = useMemo(() => 
    householdMembers.find(member => member.email === "nhi_nguyen@gmail.com"),
    [householdMembers]
  );

  // Memoized handlers
  const showModal = useCallback((member = null) => {
    if (member) {
      setEditingMember(member);
      form.setFieldsValue({
        name: member.name,
        email: member.email,
        phone: member.phone,
        avatar: [{ url: member.avatar, thumbUrl: member.avatar }]
      });
    } else {
      setEditingMember(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  }, [form]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setEditingMember(null);
    form.resetFields();
  }, [form]);

  const handleDelete = useCallback((email) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to remove this member?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setHouseholdMembers(prev => prev.filter(member => member.email !== email));
        message.success('Member removed successfully');
      },
    });
  }, []);

  const handleSubmit = useCallback((values) => {
    try {
      const updatedMember = {
        ...values,
        avatar: values.avatar?.[0]?.thumbUrl || values.avatar?.[0]?.url || editingMember?.avatar
      };

      setHouseholdMembers(prevMembers => {
        if (editingMember) {
          return prevMembers.map(member =>
            member.email === editingMember.email ? updatedMember : member
          );
        }
        return [...prevMembers, {
          ...updatedMember,
          avatar: updatedMember.avatar || Object.values(DEFAULT_PHOTOS)[Math.floor(Math.random() * 4)]
        }];
      });

      message.success(`Member ${editingMember ? 'updated' : 'added'} successfully!`);
      handleCancel();
    } catch (error) {
      message.error('Operation failed');
    }
  }, [editingMember, handleCancel]);

  const normFile = useCallback((e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  }, []);

  // Memoized member list
  const memberList = useMemo(() => (
    householdMembers.map(member => (
      <MemberCard
        key={member.email}
        member={member}
        isCurrentUser={member.email === currentUser?.email}
        onEdit={showModal}
        onDelete={handleDelete}
      />
    ))
  ), [householdMembers, currentUser, showModal, handleDelete]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <img
            src={currentUser?.avatar}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <h2>{currentUser?.name}</h2>
            <p>{currentUser?.email}</p>
            <p className={styles.joinDate}>Join the Sweet House {currentUser?.joinDate}</p>
          </div>
        </div>

        {/* Sweet House Section */}
        <div className={styles.sweetHouseSection}>
          <h2>SWEET HOUSE</h2>
          <div className={styles.membersGrid}>
            {memberList}
            <div className={styles.addMemberBox} onClick={() => showModal()}>
              <div className={styles.dottedBorder}>
                <span>Add</span>
                <span>New User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className={styles.settingsNav}>
          <Button type="link">Settings</Button>
          <span>•</span>
          <Button type="link">Help?</Button>
          <span>•</span>
          <Button type="link">Log out</Button>
        </div>

        {/* Add/Edit Member Modal */}
        <Modal
          title={editingMember ? "Edit Member" : "Add New Member"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="avatar"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please input email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input />
            </Form.Item>

            <div className={styles.modalButtons}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingMember ? 'Save Changes' : 'Add Member'}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;


