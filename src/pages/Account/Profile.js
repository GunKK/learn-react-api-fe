import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap"
import { toast } from 'react-toastify';
import { updateFullName } from "../../redux/actions/auth"
import userApi from "../../api/userApi"
import authApi from "../../api/authApi"
import styles from "./Account.module.css"

export default function Profile() {

  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.auth)
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const fetchDataUser = async () => {
        try {
          // const res = await userApi.getById(currentUser.userId)
          const res = await authApi.me();
          const { id, email, name } = res;
          setProfile({
            id: id,
            email: email,
            fullName: name,
            // gender: 0,
            // birthday: '' 
          })
        } catch (error) {
          console.log(error)
        }
    }
    
    if (currentUser?.userId) {
      fetchDataUser()
    }
  }, [currentUser])


  const formik = useFormik({
    initialValues: {
      fullName: profile.fullName ? profile.fullName : '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      const  { fullName } = formik.values

      try {
        const result = await userApi.updateById(profile._id, {
          fullName
        })
        dispatch(updateFullName({fullName: result.data.fullName}))
        toast.success('Cập nhật thành công!', {autoClose: 2000})
      } catch (error) {
        console.log(error)
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={`form-group ${styles.formGroup}`}>
        <label className={styles.formLabel}>Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${styles.formControl}`}
          placeholder="Email"
          value={profile && profile.email ? profile.email : ''}
          readOnly
        />
      </div>
      <div className={`form-group ${styles.formGroup}`}>
        <label className={styles.formLabel}>Họ và tên</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className={`form-control ${styles.formControl} ${formik.errors.fullName ? 'is-invalid' : 'is-valid'}`}
          placeholder="Họ và tên"
          value={formik.values.fullName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      {formik.errors.fullName && (
        <Form.Control.Feedback type="invalid" className={styles.feedback}>
          {formik.errors.fullName}
        </Form.Control.Feedback>
      )}
      </div>
  

      <button type="submit" className={`bookstore-btn ${styles.submitBtn}`}
        disabled={formik.errors.fullName}
      >
        Cập nhật
      </button>
    </form>
  );
}
