import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, InputNumber, Switch } from 'antd';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import axios from 'axios';
import { PlusOutlined  } from '@ant-design/icons'
import { Link } from "react-router-dom";

import "./placeTable.scss";

const { Search } = Input;

const PlaceTable = () => {
  
  const { data, loading, error , refetch} = useFetch("/places");
  const [filteredData, setFilteredData] = useState(data);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedPlace, setEditedPlace] = useState(null);
  const [size, setSize] = useState('large');
 
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Photos',
      dataIndex: 'photos',
      key: 'photos',
      render: (photos) => (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {photos.map((photo, index) => (
            <li key={index}>
              <img
                src={photo}
                alt={`Photo ${index}`}
                style={{ width: '80px', height: 'auto', borderRadius: '5px' }}
              />
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Short Description',
      dataIndex: 'descshort',
      key: 'descshort',
      render: (descshort) => descshort.length > 20 ? `${descshort.substring(0, 20)}...` : descshort,
    },
    {
      title: 'Long Description',
      dataIndex: 'desclong',
      key: 'desclong',
      render: (desclong) => desclong.length > 20 ? `${desclong.substring(0, 20)}...` : desclong,
    },
    {
      title: 'Safety Tips',
      dataIndex: 'safetyTips',
      key: 'safetyTips',
      render: (safetyTips) => safetyTips && safetyTips.length > 20 ? `${safetyTips.substring(0, 20)}...` : safetyTips,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      key: 'latitude',
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      key: 'longitude',
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured) => (featured ? 'Yes' : 'No'),
    },
    {
      title: 'Edit',
      key: 'edit',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => showDeleteConfirmation(record)} danger>
          Delete
        </Button>
      ),
    },
  ];

  const handleSearch = (value) => {
    const filtered = data.filter(item => {
      const name = item.name.toLowerCase();
      const searchValue = value.toLowerCase();
      return name.includes(searchValue);
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const showDeleteConfirmation = (record) => {
    setDeleteItem(record);
    setDeleteModalVisible(true);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/places/${deleteItem._id}`);
      setDeleteModalVisible(false);
      refetch();
    } catch (error) {
      console.error('Error deleting place:', error.response.status);
    }
  };

  const handleEdit = (place) => {
    setEditedPlace(place);
    setEditModalVisible(true);
    form.setFieldsValue(place);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await axios.put(`/places/${editedPlace._id}`, values);
        if (response.status === 200) {
          setEditModalVisible(false);
        } else {
          console.error('Failed to update place:', response.data);
        }
      } catch (error) {
        console.error('Error updating place:', error);
      }
    });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newTripContainer">
        <Navbar />
        <div className="bottomTrip">
          <div className="search-bar">
            <Search
              placeholder="Search place name"
              onSearch={handleSearch}
              style={{
                width: 200,
              }}
            />
          </div>
          <br />
          <Table
            dataSource={filteredData}
            columns={columns}
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              total: filteredData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            rowKey="_id"
          />
           <Link to="/places/new">
           <Button type="primary"  icon={<PlusOutlined  />} size={size}>
            Add Place 
          </Button>
          </Link>
        </div>
      </div>
      <Modal
         title="Edit Place"
         visible={editModalVisible}
         onCancel={handleEditModalCancel}
         onOk={handleEditModalOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please enter a type' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter a city' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter an address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="distance"
            label="Distance"
            rules={[{ required: true, message: 'Please enter a distance' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="photos"
            label="Photos"
            rules={[{ required: true, message: 'Please enter photos' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descshort"
            label="Short Description"
            rules={[{ required: true, message: 'Please enter a short description' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desclong"
            label="Long Description"
            rules={[{ required: true, message: 'Please enter a long description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="safetyTips"
            label="Safety Tips"
            rules={[{ required: true, message: 'Please enter safety tips' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please enter a rating' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true, message: 'Please enter a latitude' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true, message: 'Please enter a longitude' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Place"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        Are you sure you want to delete this place?
      </Modal>
    </div>
  );
};

export default PlaceTable;
