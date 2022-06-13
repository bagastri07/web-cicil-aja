import React, { Component } from "react";
import { ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  CloseButton,
  Divider,
  Input,
} from "@chakra-ui/react";
import API from "../../../../api";
import Redirect from "../../../../auth/redirect";
import DashboardLayout from "../../../../components/dashboardLayout";
import dayjs from "dayjs";
import id from "dayjs/locale/id";
import Link from "next/link";
import { withRouter, NextRouter } from "next/router";

class Edit_ktm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ktp_file: null,
    };
  }

  handleImagePreview = (e) => {
    let image_as_files = e.target.files[0];

    this.setState({
      ktm_file: image_as_files,
    });
  };

  handleSubmitFile = (e) => {
    e.preventDefault();
    if (this.state.ktm_file !== null) {
      const formData = new FormData();
      formData.append("img_ktm", this.state.ktm_file);

      const token = localStorage.getItem("token");
      console.log(this.state.ktm_file);
      console.log(formData);
      API.postKtm(formData, token).then((resp) => {
        console.log(resp);
        this.props.router.push("/dashboard/profile/document");
      });
    }
  };

  render() {
    return (
      <Redirect>
        <DashboardLayout page="profile">
          <div className="mb-5">
            <Breadcrumb
              spacing="8px"
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/dashboard">
                  <a>Dashboard</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/dashboard/profile">
                  <a>Profile</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} href="/dashboard/profile/document">
                  <a>Document</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  href="/dashboard/profile/document/edit_ktm"
                >
                  <a>Edit KTM</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Divider marginTop="5" />
          </div>
          <div>
            <h1 className="text-4xl">Edit KTM</h1>
            <div className="py-5">
              <form
                onSubmit={this.handleSubmitFile}
                className="w-full bg-purple-100 rounded-xl p-5"
              >
                <ul>
                  <li>
                    Foto Kartu Tanda Mahasiswa:{" "}
                    <Input
                      variant="outline"
                      type="file"
                      colorScheme="purple"
                      onChange={this.handleImagePreview}
                      required
                    />
                  </li>
                </ul>
                <Button colorScheme="purple" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </DashboardLayout>
      </Redirect>
    );
  }
}

export default withRouter(Edit_ktm);
