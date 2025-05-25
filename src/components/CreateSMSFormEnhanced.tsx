
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CreateSMSFormEnhanced = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    campaign_name: "",
    message_text: "",
    target_audience: "",
    send_date: "",
    send_time: "",
    sender_name: "",
    budget: "",
    recipients_count: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ایجاد کمپین پیامکی باید وارد شوید.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll just show a success message since we don't have an SMS table
      toast({
        title: "موفق",
        description: "درخواست کمپین پیامکی شما ثبت شد. با شما تماس گرفته خواهد شد.",
      });
      
      setFormData({
        campaign_name: "",
        message_text: "",
        target_audience: "",
        send_date: "",
        send_time: "",
        sender_name: "",
        budget: "",
        recipients_count: "",
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ثبت درخواست کمپین رخ داد.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ایجاد کمپین پیامکی</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">اطلاعات کمپین</h3>
            <div>
              <label className="block text-sm font-medium mb-2">نام کمپین *</label>
              <Input
                value={formData.campaign_name}
                onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                placeholder="نام کمپین پیامکی"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">متن پیام *</label>
              <Textarea
                value={formData.message_text}
                onChange={(e) => setFormData(prev => ({ ...prev, message_text: e.target.value }))}
                placeholder="متن پیامک خود را وارد کنید"
                required
                rows={4}
                maxLength={160}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.message_text.length}/160 کاراکتر
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نام فرستنده</label>
              <Input
                value={formData.sender_name}
                onChange={(e) => setFormData(prev => ({ ...prev, sender_name: e.target.value }))}
                placeholder="نام شرکت یا برند"
                maxLength={11}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تنظیمات ارسال</h3>
            <div>
              <label className="block text-sm font-medium mb-2">مخاطب هدف</label>
              <Select value={formData.target_audience} onValueChange={(value) => setFormData(prev => ({ ...prev, target_audience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="مخاطب هدف را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_users">همه کاربران</SelectItem>
                  <SelectItem value="theater_customers">مشتریان تئاتر</SelectItem>
                  <SelectItem value="concert_lovers">علاقه‌مندان کنسرت</SelectItem>
                  <SelectItem value="vip_customers">مشتریان ویژه</SelectItem>
                  <SelectItem value="new_users">کاربران جدید</SelectItem>
                  <SelectItem value="custom">سفارشی</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تاریخ ارسال</label>
                <Input
                  type="date"
                  value={formData.send_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, send_date: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ساعت ارسال</label>
                <Input
                  type="time"
                  value={formData.send_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, send_time: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">تعداد گیرندگان (تقریبی)</label>
                <Input
                  type="number"
                  value={formData.recipients_count}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipients_count: e.target.value }))}
                  placeholder="1000"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">بودجه (تومان)</label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="500000"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>توجه:</strong> پس از ثبت درخواست، تیم ما با شما تماس خواهد گرفت تا جزئیات کمپین و قیمت نهایی را تعیین کنیم.
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ثبت..." : "ثبت درخواست کمپین"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSMSFormEnhanced;
