
import fetch from 'isomorphic-unfetch';

const EditNote = () => {




    return (
        <div className="form-container" style={{ display: "flex", justifyContent: "center" }}>

        </div>
    )
}

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default EditNote;