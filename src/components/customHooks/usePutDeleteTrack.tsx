import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Context } from "../../context";

import { deleteFromAPI, putToAPI } from "../../utils/fetchFromAPI";

export default function usePutDeleteTrack(userSavedTrack: any, item: any) {

    const { token } = useContext(Context)
    const [reload, setReload] = useState(true)

    if (userSavedTrack[0]) {
        Swal.fire({
            customClass: 'button__alert',
            position: 'bottom',
            title: 'Removed from your Liked Songs',
            showConfirmButton: false, backdrop: false,
            timer: 1800,
        })
        setReload(!reload)
        deleteFromAPI(`me/tracks?ids=${item.track?.id}`, token)
    } else {
        Swal.fire({
            customClass: 'button__alert',
            position: 'bottom',
            title: 'Added to your Liked Songs',
            showConfirmButton: false, backdrop: false,
            timer: 1800,
        })
        setReload(!reload)
        putToAPI(`me/tracks?ids=${item.track?.id}`, token, item)
    }
}