import React, { useEffect, useState, useMemo } from "react";
import PanelHeading from '@/components/PanelHeading';
import PrimaryModal from '@/components/PrimaryModal';
import ReactTable from '@/components/ReactTable';
import Edit from "../../../public/dist/img/Edit.svg";
import Trash from "../../../public/dist/img/Trash.svg";
import Disable from "../../../public/dist/img/Disable.svg";
import Enable from "../../../public/dist/img/Enable.svg";
import CircularLoader from '@/components/circularLoader';
import Image from "next/image";
import Select from "react-select";
import { useQuery, gql ,useMutation } from '@apollo/client';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialStateValue = {
    COMPANY_NAME: "",
    COMPANY_CODE: "",
    ABBREVIATION: "",
  };
  
  const initialEditValue = {
    isEdit: false,
    id: null,
  };

  const getCompanyData = gql`
  query getAllCompanies{
    getAllCompany {
        COMPANY_NAME,
        COMPANY_ID,
        COMPANY_CODE
        ABBREVIATION
        OPERATOR
        MODIFIED_BY
    }
  }
`;

const DISABLE_COMPANY = gql`
    mutation disableCompany ($id: Float!, $operatorDTO: OperatorDTO!) {
        disableCompany (id:$id,
        operatorDTO: $operatorDTO
        ) {
        status
        httpStatus
        message
        data
        }
    }
`;

const ENABLE_COMPANY = gql`
    mutation enableCompany ($id: Float!, $operatorDTO: OperatorDTO!) {
        enableCompany (id:$id,
        operatorDTO: $operatorDTO
        ) {
        status
        httpStatus
        message
        data
        }
    }
`;

const DELETE_COMPANY = gql`
    mutation deleteCompany ($id: Float!, $operatorDTO: OperatorDTO!) {
        deleteCompany (id:$id,
        operatorDTO: $operatorDTO
        ) {
        status
        httpStatus
        message
        data
        }
    }
`;

const CREATE_COMPANY = gql`
    mutation createBlog ($companyDto:CompanyDto!) {
        createCompany (companyDto:$companyDto ) {
        status
        httpStatus
        message
        data
        }
    }
`;

const UPDATE_COMPANY = gql`
    mutation updateCompany ($id: Float!, $updateCompanyDto: UpdateCompanyDto!){
        updateCompany (id:$id,
        updateCompanyDto: $updateCompanyDto
        ) {
        status
        httpStatus
        message
        data
        }
    }
`;


export default function Company() {
    const [showFormState, setShowFormState] = useState(true);
    const [companyState, setCompanyState] = useState(initialStateValue);
    const [editMode, setEditMode] = useState(initialEditValue);
    const [showLoader, setShowLoader] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        show: false,
        id: null,
      });
    const [tableDataState, setTableDataState] = useState([]);
    const { companyLoading, companyError, data , refetch  } = useQuery(getCompanyData);

    const [disableCompany, { disableLoading, disableError }] = useMutation(DISABLE_COMPANY, {
        onCompleted: (data) => {
        const responseData = data.disableCompany;
        if(responseData['status']==='SUCCESS')
        {
            toast.success(responseData['message']);
            refetch();
        }
        else
        {
            toast.error(responseData['message']);
            refetch();
        }
        },
        onError: (error) =>{
            console.log('There was an error:', error);
        }
      });

      const [enableCompany, { enableLoading, enableError }] = useMutation(ENABLE_COMPANY, {
        onCompleted: (data) => {
        const responseData = data.enableCompany;
        if(responseData['status']==='SUCCESS')
        {
            toast.success(responseData['message']);
            refetch();
        }
        else
        {
            toast.error(responseData['message']);
            refetch();
        }
        },
        onError: (error) =>{
            console.log('There was an error:', error);
        }
      });

      const [deleteCompany, { deleteLoading, deleteError }] = useMutation(DELETE_COMPANY, {
        onCompleted: (data) => {
        const responseData = data.deleteCompany;
        if(responseData['status']==='SUCCESS')
        {
            setCompanyState(initialStateValue);
            setEditMode(initialEditValue);
            toast.success(responseData['message']);
            refetch();
            handleDel();
        }
        else
        {
            setCompanyState(initialStateValue);
            setEditMode(initialEditValue);
            toast.error(responseData['message']);
            refetch();
            handleDel();
        }
        },
        onError: (error) =>{
            console.log('There was an error:', error);
            setEditMode(initialEditValue);
            setCompanyState(initialStateValue);
            handleDel();
        }
      });

      const [createCompany, { createLoading, createError }] = useMutation(CREATE_COMPANY, {
        onCompleted: (data) => {
        const responseData = data.createCompany;
        if(responseData['status']==='SUCCESS')
        {
            setCompanyState(initialStateValue);
            setEditMode(initialEditValue);
            handleShowFormNew(false);
            toast.success(responseData['message']);
            refetch();
        }
        else
        {
            toast.error(responseData['message']);
            refetch();
        }
        },
        onError: (error) =>{
            console.log('There was an error:', error);
            setEditMode(initialEditValue);
            setCompanyState(initialStateValue);
        }
      });

      const [updateCompany, { updateLoading, updateError }] = useMutation(UPDATE_COMPANY, {
        onCompleted: (data) => {
        const responseData = data.updateCompany;
        if(responseData['status']==='SUCCESS')
        {
            setCompanyState(initialStateValue);
            setEditMode(initialEditValue);
            handleShowFormNew(false);
            toast.success(responseData['message']);
            refetch();
        }
        else
        {
            toast.error(responseData['message']);
            refetch();
        }
        },
        onError: (error) =>{
            console.log('There was an error:', error);
            setEditMode(initialEditValue);
            setCompanyState(initialStateValue);
        }
      });

 
    const cols = React.useMemo(() => [
        {
          Header: "name",
          accessor: "col_company_name",
        },
        {
          Header: "company code",
          accessor: "col_company_code",
        },
        {
          Header: "abbreviation",
          accessor: "col_abbreviation",
        },
        {
          Header: "Last Updated By",
          accessor: "col_last_updated_by",
        },
        {
          Header: "Actions",
          accessor: "col_actions",
        },
      ], []);


    const handleShowFormNew = (flag_visible) => {
        setShowFormState(flag_visible);
      };

      const handleShowForm = () => {
        setShowFormState(!showFormState);
      };

      const handleNewCompanyFormSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();

        const operator = 'alyan.quddoos';

        const isStateNull = Object.values(companyState).some((value) => {
            // 👇️ check for multiple conditions
            if (value === null || value === undefined || value === "") {
              return true;
            }
            return false;
          });

          if (isStateNull) {
            setShowLoader(false);
            toast.warn("Please fill all fields");
            return;
          }
          
        const payload=
        {
            companyDto: {
                COMPANY_NAME: companyState.COMPANY_NAME.trim(),
                COMPANY_CODE: companyState.COMPANY_CODE.trim(),
                ABBREVIATION: companyState.ABBREVIATION.trim(),
                OPERATOR:operator
            }
        }

        await createCompany({ variables:payload });
        setShowLoader(false);
      };

      const handleDisable = async (dis_id) => {
        const payload=
        {
            id:dis_id,
            operatorDTO: {
                MODIFIED_BY: "alyan.quddoos"
            }
        }
        
        await disableCompany({ variables:payload });
      };

      const handleEnable = async (enable_id) => {
        const payload=
        {
            id:enable_id,
            operatorDTO: {
              MODIFIED_BY: "alyan.quddoos"
            }
          }
    
        await enableCompany({ variables:payload });
      };

      const closeEditForm = () => {
        handleShowFormNew(false);
        setEditMode(initialEditValue);
        setCompanyState(initialStateValue);
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyState({
          ...companyState,
          [name]: value,
        });
      };

      const deleteFun = async () => {
        const payload=
        {
            id:deleteModal.id,
            operatorDTO: {
              MODIFIED_BY: "alyan.quddoos"
            }
          }
    
        await deleteCompany({ variables:payload });
      };

      const prepareTableData = async (rawData) => {
        let data = [];
    
        rawData.forEach((element, i) => {
          data.push({
            SR: i + 1,
            id: element.COMPANY_ID,
            col_company_name: element.COMPANY_NAME,
            col_company_code: element.COMPANY_CODE,
            col_abbreviation: element.ABBREVIATION,
            col_last_updated_by: element.MODIFIED_BY
              ? element.MODIFIED_BY
              : element.OPERATOR,
            col_record_status: element.RECORD_STATUS,
            col_row_status: element.ROW_STATUS,
    
            col_actions: (
              <div style={{ whiteSpace: "nowrap" }}>
               
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-dark p-0"
                      onClick={() =>
                        handleEdit(
                          element.COMPANY_NAME,
                          element.COMPANY_CODE,
                          element.ABBREVIATION,
                          element.COMPANY_ID
                        )
                      }
                    >
                      <Image src={Edit}></Image>
                    </a>
                    &nbsp;
                  </>
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-danger p-0"
                      onClick={() => handleDel(element.COMPANY_ID)}
                    >
                      <Image src={Trash}></Image>
                    </a>
                    &nbsp;
                  </>
                  <>
                    <a
                      style={{ cursor: "pointer" }}
                      className="text-warning p-0"
                      onClick={() => handleDisable(+element.COMPANY_ID)}
                      disabled={element.RECORD_STATUS !== "active"}
                    >
                      <Image src={Disable}></Image>
                    </a>
                    &nbsp;
                  </>
              
                  <a
                    style={{ cursor: "pointer" }}
                    className="text-success p-0"
                    onClick={() => handleEnable(+element.COMPANY_ID)}
                    disabled={element.RECORD_STATUS === "active"}
                  >
                    <Image src={Enable}></Image>
                  </a>
              </div>
            ),
          });
        });
        setTableDataState(data);
      };

      const handleUpdateFormSubmit = async (e) => {
        setShowLoader(true);
        e.preventDefault();
        const operator = 'alyan.quddoos';

        const isStateNull = Object.values(companyState).some((value) => {
            // 👇️ check for multiple conditions
            if (value === null || value === undefined || value === "") {
              return true;
            }
            return false;
          });
      
          if (isStateNull) {
            setShowLoader(false);
            toast.warn("Please fill all fields");
            return;
          }

         const payload=
        {
            id:editMode.id,
            updateCompanyDto: {
                COMPANY_NAME: companyState.COMPANY_NAME.trim(),
                COMPANY_CODE: companyState.COMPANY_CODE.trim(),
                ABBREVIATION: companyState.ABBREVIATION.trim(),
                MODIFIED_BY:operator
            }
        }

        await updateCompany({ variables:payload });
        setShowLoader(false);

      };

      const handleIsNumber = (event) => {
        let charCode = event.which ? event.which : event.keyCode;
        if (
          charCode === 38 ||
          charCode === 40 ||
          charCode === 69 ||
          charCode === 106 ||
          event.key === "+" ||
          event.key === "-" ||
          event.key === "," ||
          event.key === "."
        ) {
          event.preventDefault();
        }
      };

      const handleDel = (del_id = null) => {
        setDeleteModal({
          show: !deleteModal.show,
          id: del_id,
        });
      };

      const handleEdit = (COMPANY_NAME, COMPANY_CODE, ABBREVIATION, COMPANY_ID) => {
        handleShowFormNew(true);
        setEditMode({ isEdit: true, id: COMPANY_ID });
        setCompanyState({
          COMPANY_NAME,
          COMPANY_CODE,
          ABBREVIATION,
        });
        window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
      };

      useEffect(() => {
        if(data)
        {
            prepareTableData(data['getAllCompany']);
        }
      }, [data]);

    return (
        <>
            {" "}
            <div className="panel panel-inverse ">
              <div className="panel-heading panel-heading-div custom-bg-color rounded-top">
                <div className="pull-left">
                  {editMode.isEdit === true ? (
                    <h6 className="panel-title text-white weight-400 font-16">
                      Update Company Form
                    </h6>
                  ) : (
                    <h6 className="panel-title text-white weight-400 font-16">
                      Company Creation Form
                    </h6>
                  )}
                </div>
           
                  <div className="panel-heading-button">
                    {!showFormState && (
                      <div>
                        <button
                          className="pull-right"
                          style={{
                            borderStyle: "none",
                            background: "#284E93",
                            borderRadius: "50%",
                            outline: "none",
                          }}
                          onClick={handleShowForm}
                        >
                          <i className="fa fa-angle-down text-white"></i>
                        </button>
                      </div>
                    )}
                    {showFormState && (
                      <div>
                        <button
                          className="pull-right"
                          style={{
                            borderStyle: "none",
                            background: "#284E93",
                            borderRadius: "50%",
                            outline: "none",
                          }}
                          onClick={handleShowForm}
                        >
                          <i className="fa fa-angle-up text-white"></i>
                        </button>
                      </div>
                    )}
                  </div>
    
                <div className="clearfix"> </div>
              </div>
    
              {showFormState === true && (
                <form
                  onSubmit={
                    editMode.isEdit === false
                      ? handleNewCompanyFormSubmit
                      : handleUpdateFormSubmit
                  }
                  className="panel-wrapper collapse in"
                >
                  <div className="panel-body">
                    <div className="">
                      <div className="row">
                        <div className="form-group col-md-6 col-sm-12">
                          <label className="control-label mb-1 text-left font-14 weight-500">
                            Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company Name"
                            name="COMPANY_NAME"
                            value={companyState.COMPANY_NAME}
                            onChange={handleInputChange}
                          ></input>
                        </div>
    
                        <div className="form-group col-md-6 col-sm-12">
                          <label className="control-label mb-1 text-left font-14 weight-500">
                            Company Code
                          </label>
                          <input
                            onKeyDown={(evt) => handleIsNumber(evt)}
                            type="number"
                            className="form-control"
                            placeholder="Enter Company Code"
                            name="COMPANY_CODE"
                            value={companyState.COMPANY_CODE}
                            onChange={handleInputChange}
                          ></input>
                        </div>
    
                        <div className="form-group col-md-6 col-sm-12">
                          <label className="control-label mb-1 text-left font-14 weight-500">
                            Abbreviation
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Abbreviation"
                            name="ABBREVIATION"
                            value={companyState.ABBREVIATION}
                            onChange={handleInputChange}
                          ></input>
                        </div>

                      </div>
    
                      <div
                        className="row mt-3"
                        style={{ float: "right", marginRight: "3px" }}
                      >
                        <button
                          className="btn btn-default bg-white text-dark border-secondary btn-fixed-width"
                          style={{
                            fontSize: "14px",
                            // outlineColor:'light-grey',
                            //  outlineStyle:'solid',
                            //  border:'none'
                          }}
                          onClick={closeEditForm}
                        >
                          Cancel
                        </button>
                        &nbsp;
                        {editMode.isEdit === true ? (
                          showLoader === false ? (
                            <button
                              className="btn btn-primary btn-fixed-width"
                              style={{ background: "#284E93", fontSize: "14px" }}
                            >
                              Update{" "}
                            </button>
                          ) : (
                            <CircularLoader />
                          )
                        ) : showLoader === false ? (
                          <button
                            className="btn btn-primary btn-fixed-width"
                            style={{ background: "#284E93", fontSize: "14px" }}
                          >
                            Save{" "}
                          </button>
                        ) : (
                          <CircularLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
    
          <PrimaryModal isOpenProp={deleteModal.show}>
            <div style={{ margin: "1rem 15px 2rem 15px", padding: "1rem 12rem" }}>
              <div className="d-flex justify-content-center">
                <img src="dist/img/cross-icon.svg" alt="delete icon" />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <h5 className="font-16">Are you sure you want to delete?</h5>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <button
                  className="btn btn-outline btn-secondary text-dark px-3 mr-1"
                  onClick={handleDel}
                >
                  Cancel
                </button>
                &nbsp;
                <button className="btn btn-danger px-3" onClick={deleteFun}>
                  Delete
                </button>
              </div>
            </div>
          </PrimaryModal>
            <div className="panel panel-inverse ">
              <PanelHeading text="Available Companies" />
              <div className="panel-wrapper collapse in">
                <div className="panel-body">
                 
                    <div>
                        <ReactTable columns={cols} data={tableDataState} />
                    </div>
                
                </div>
              </div>
            </div>
        </>
      );
}
