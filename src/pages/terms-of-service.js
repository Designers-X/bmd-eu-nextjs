import React, { useEffect, useState } from "react"
import styles from "@/styles/spedizione.module.css"
import PageHead from "@/utilities/Head"
import pages from '../../json/pages.json'

export default function ReturnAndCancellationPolicy() {

    return (
        <section className={styles.container}>
            <PageHead content={{title:'Terms of Service | Bruno MD',description:"Siamo fiduciosi che sarai soddisfatto dei tuoi prodotti Bruno MD, tuttavia, se non sei soddisfatto del tuo acquisto, ti rimborseremo l&apos;intero primo ordine."}}/>
            <h1>Terms of Service</h1>
            <div className={styles.textHolder} dangerouslySetInnerHTML={{ __html: pages['terms-of-service'] }}/>
        </section>
    )
}
