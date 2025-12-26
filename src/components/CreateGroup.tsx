import React, { useState } from 'react';
import styles from '../styles/CreateGroup.module.css';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [contribution, setContribution] = useState('');
  const [members, setMembers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [turnType, setTurnType] = useState('manual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const groupData = {
      groupName,
      contribution: parseFloat(contribution),
      members: parseInt(members),
      startDate,
      turnType,
    };
    console.log("🚀 Group Created:", groupData);
    alert('تم إنشاء المجموعة بنجاح ✅');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>إنشاء مجموعة ادخار</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          اسم المجموعة:
          <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
        </label>

        <label>
          مبلغ الاشتراك الشهري:
          <input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} required />
        </label>

        <label>
          عدد الأعضاء:
          <input type="number" value={members} onChange={(e) => setMembers(e.target.value)} required />
        </label>

        <label>
          تاريخ البدء:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>

        <label>
          نوع ترتيب الأدوار:
          <select value={turnType} onChange={(e) => setTurnType(e.target.value)}>
            <option value="manual">يدوي</option>
            <option value="automatic">عشوائي</option>
          </select>
        </label>

        <button type="submit" className={styles.button}>إنشاء المجموعة</button>
      </form>
    </div>
  );
};

export default CreateGroup;
